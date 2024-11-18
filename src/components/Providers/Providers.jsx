import AuthProvier from "../../context/AuthProvider";
import BookmarksProvider from "../../context/BookmarksProvider";
import HotelsProvider from "../../context/HotelsProvider";

export default function Providers({ children }) {
  return (
    <BookmarksProvider>
      <AuthProvier>
        <HotelsProvider>{children}</HotelsProvider>
      </AuthProvier>
    </BookmarksProvider>
  );
}
