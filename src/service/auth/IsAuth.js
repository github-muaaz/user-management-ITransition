import { Navigate } from "react-router-dom";

import storage from "../../store/local-storage";
import config from "../../config.json";

const IsAuth = ({ children }) => {
  const storeItem = storage.get(config.storageKey);
  return storeItem?.isAuthenticated ? children : <Navigate to="/" />;
};

export default IsAuth;
