import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store/configureStore";
import { Contact, ContactParams } from "../../../app/models/contact";
import agent from "../../../app/api/agent";
import { MetaData } from "../../../app/models/pagination";

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

// Entity adapter oluşturulması
const contactAdapter = createEntityAdapter<Contact>();

// Async thunk oluşturulması
export const fetchContactsAsync = createAsyncThunk<
  Contact[],
  void,
  { state: RootState }
>("contact/fetchContactsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().contacts.contactParams); // burada parametreleri agent'e gönderiyoruz
  try {
    const response = await agent.Contacts.list(params); // burada parametreleri agent'e gönderiyoruz
    thunkAPI.dispatch(setMetaData(response.metaData)); // burada metaData'yı state'e kaydediyoruz
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

// ContactSlice oluşturulması
export const contactSlice = createSlice({
  name: "contact",
  initialState: contactAdapter.getInitialState<ContactState>({
    contactsLoaded: false, // burada contactsLoaded alanını tanımlıyoruz
    status: "idle", // burada status alanını tanımlıyoruz
    contactParams: {
      // burada contactParams alanını tanımlıyoruz
      pageNumber: 1,
      pageSize: 10,
      orderBy: "name",
      searchTerm: "",
    },
    metaData: null, // burada metaData alanını tanımlıyoruz
  }),
  reducers: {
    setContactParams: (state, action) => {
      // burada contactParams'ı değiştirmek için bir fonksiyon yazıyoruz
      state.contactsLoaded = false;
      state.contactParams = {
        ...state.contactParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      // burada pageNumber'ı değiştirmek için bir fonksiyon yazıyoruz
      state.contactsLoaded = false;
      state.contactParams = {
        ...state.contactParams,
        ...action.payload,
      };
    },
    resetContactParams: (state) => {
      // burada contactParams'ı sıfırlamak için bir fonksiyon yazıyoruz
      state.contactParams = {
        pageNumber: 1,
        pageSize: 10,
        orderBy: "name",
        searchTerm: "",
      };
    },
    setMetaData: (state, action) => {
      // burada metaData'yı değiştirmek için bir fonksiyon yazıyoruz
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactsAsync.pending, (state) => {
      // burada fetchContactsAsync'in pending durumunu ele alıyoruz
      state.status = "pendingFetchContacts";
    });
    builder.addCase(fetchContactsAsync.fulfilled, (state, action) => {
      contactAdapter.setAll(state, action.payload);
      state.contactsLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchContactsAsync.rejected, (state, action) => {
      // burada fetchContactsAsync'in rejected durumunu ele alıyoruz
      console.log(action.error);
      state.status = "idle";
    });
    builder.addCase(fetchContactAsync.pending, (state) => {
      // burada fetchContactAsync'in pending durumunu ele alıyoruz
      state.status = "pendingFetchContact";
    });
    builder.addCase(fetchContactAsync.fulfilled, (state, action) => {
      contactAdapter.upsertOne(state, action.payload); // burada contact'ı state'e ekliyoruz veya güncelliyoruz
      state.status = "idle";
    });
    builder.addCase(fetchContactAsync.rejected, (state, action) => {
      // burada fetchContactAsync'in rejected durumunu ele alıyoruz
      console.log(action.error);
      state.status = "idle";
    });
  },
});

// ContactSelectors oluşturulması
export const contactSelectors = contactAdapter.getSelectors(
  (state: RootState) => state.contacts
);

// ContactSlice actions'unun export edilmesi
export const {
  setContactParams,
  setMetaData,
  resetContactParams,
  setPageNumber,
} = contactSlice.actions;
