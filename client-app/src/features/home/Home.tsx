import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <h1>Adres Defteri Uygulaması</h1>
      <div className="flex items-center space-x-5">
        <Button component={Link} to="/signup" variant="contained">
          Kayıt Oluşturmak için Tıklayın
        </Button>
        <Button component={Link} to="/contacts" variant="contained">
          Kayıtlara Gitmek için Tıklayın
        </Button>
      </div>
    </div>
  );
}
