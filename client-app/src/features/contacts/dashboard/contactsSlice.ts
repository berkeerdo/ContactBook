import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store/configureStore";
import { Contact, ContactParams } from "../../../app/models/contact";
import agent from "../../../app/api/agent";
import { MetaData } from "../../../app/models/pagination";
import { toast } from "react-toastify";

interface ContactState {
  contactsLoaded: boolean;
  status: string;
  contactParams: ContactParams;
  metaData: MetaData | null;
}

function getAxiosParams(contactParams: ContactParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", contactParams.pageNumber!.toString());
  params.append("pageSize", contactParams.pageSize!.toString());
  params.append("orderBy", contactParams.orderBy!);
  params.append("searchTerm", contactParams.searchTerm!);
  return params;
}

const contactAdapter = createEntityAdapter<Contact>();

export const fetchContactsAsync = createAsyncThunk<
  Contact[],
  void,
  { state: RootState }
>("contact/fetchContactsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().contacts.contactParams);
  try {
    const response = await agent.Contacts.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchContactAsync = createAsyncThunk<Contact, number>(
  "contact/fetchContactAsync",
  async (contactId, thunkAPI) => {
    try {
      return await agent.Contacts.details(contactId.toString());
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const createContactAsync = createAsyncThunk<Contact, Contact>(
  "contact/createContactAsync",
  async (contact, thunkAPI) => {
    try {
      const response = await agent.Contacts.create(contact);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateContactAsync = createAsyncThunk<Contact, Contact>(
  "contact/updateContactAsync",
  async (contact, thunkAPI) => {
    try {
      await agent.Contacts.update(contact);
      return contact;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const asyncDeleteContact = createAsyncThunk<Contact, string>(
  "contact/asyncDeleteContact",
  async (id, thunkAPI) => {
    try {
      const response = await agent.Contacts.delete(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactAdapter.getInitialState<ContactState>({
    contactsLoaded: false,
    status: "idle",
    contactParams: {
      pageNumber: 1,
      pageSize: 10,
      orderBy: "name",
      searchTerm: "",
    },
    metaData: null,
  }),
  reducers: {
    setContactParams: (state, action) => {
      state.contactsLoaded = false;
      state.contactParams = {
        ...state.contactParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.contactsLoaded = false;
      state.contactParams = {
        ...state.contactParams,
        ...action.payload,
      };
    },
    resetContactParams: (state) => {
      state.contactParams = {
        pageNumber: 1,
        pageSize: 10,
        orderBy: "name",
        searchTerm: "",
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactsAsync.pending, (state) => {
      state.status = "pendingFetchContacts";
    });
    builder.addCase(fetchContactsAsync.fulfilled, (state, action) => {
      contactAdapter.setAll(state, action.payload);
      state.contactsLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchContactsAsync.rejected, (state, action) => {
      console.log(action.error);
      toast.error("Kayıtlar getirilirken bir hata oluştu.");
      state.status = "idle";
    });
    builder.addCase(fetchContactAsync.pending, (state) => {
      state.status = "pendingFetchContact";
    });
    builder.addCase(fetchContactAsync.fulfilled, (state, action) => {
      contactAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchContactAsync.rejected, (state, action) => {
      console.log(action.error);
      toast.error("Kayıt getirilirken bir hata oluştu.");
      state.status = "idle";
    });
    builder.addCase(createContactAsync.pending, (state) => {
      state.status = "pendingCreateContact";
    });
    builder.addCase(createContactAsync.fulfilled, (state, action) => {
      contactAdapter.addOne(state, action.payload);
      toast.success("Kayıt başırıyla oluşturuldu.");
      state.status = "idle";
    });
    builder.addCase(createContactAsync.rejected, (state, action) => {
      console.log(action.error);
      toast.error("Kayıt oluşturulurken bir hata oluştu.");
      state.status = "idle";
    });
    builder.addCase(updateContactAsync.pending, (state) => {
      state.status = "pendingUpdateContact";
    });
    builder.addCase(updateContactAsync.fulfilled, (state, action) => {
      contactAdapter.upsertOne(state, action.payload);
      toast.success("Kayıt başırıyla güncellendi.");
      state.status = "idle";
    });
    builder.addCase(updateContactAsync.rejected, (state, action) => {
      console.log(action.error);
      toast.error("Kayıt güncellenirken bir hata oluştu.");
      state.status = "idle";
    });
    builder.addCase(asyncDeleteContact.pending, (state) => {
      state.status = "pendingDeleteContact";
    });
    builder.addCase(asyncDeleteContact.fulfilled, (state, action) => {
      contactAdapter.removeOne(state, action.payload.id);
      toast.success("Kayıt başırıyla silindi.");
      state.status = "idle";
    });
    builder.addCase(asyncDeleteContact.rejected, (state, action) => {
      console.log(action.error);
      toast.error("Kayıt silinirken bir hata oluştu.");
      state.status = "idle";
    });
  },
});

export const contactSelectors = contactAdapter.getSelectors(
  (state: RootState) => state.contacts
);

export const {
  setContactParams,
  setMetaData,
  resetContactParams,
  setPageNumber,
} = contactSlice.actions;
