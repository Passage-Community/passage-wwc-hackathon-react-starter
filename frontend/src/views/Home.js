import {
  PassageAuth,
  PassageUnAuthGuard,
} from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";

function Home() {
  return (
    <PassageUnAuthGuard authComp={<Navigate to="/browse" />}>
      <PassageAuth />
    </PassageUnAuthGuard>
  );
}

export default Home;
