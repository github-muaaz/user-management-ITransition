import { Navigate } from "react-router-dom";

import storage from "../../store/local-storage";
import config from "../../config.json";

const IsGuest = ({ children }) => {
  const storeItem = storage.get(config.storageKey);
  return storeItem?.isAuthenticated ? <Navigate to="/" /> : children;
};

export default IsGuest;
