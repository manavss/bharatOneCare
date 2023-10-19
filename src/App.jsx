import { useState } from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import { Toaster } from "react-hot-toast";

function App() {
  const [userId, setUserId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleGetUserId = (id) => {
    setOpenModal(true);
    setUserId(id);
  };
  return (
    <div className=" font-Roboto relative min-h-screen border ">
      <AddBook
        setOpenModal={setOpenModal}
        openModal={openModal}
        id={userId}
        setUserId={setUserId}
      />
      <BookList
        openModal={openModal}
        setOpenModal={setOpenModal}
        getUserId={handleGetUserId}
      />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#333",
          },
        }}
      />
    </div>
  );
}

export default App;
