import {
  PassageAuth,
  PassageUnAuthGuard,
} from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";

function Home() {
  return (
    <PassageUnAuthGuard authComp={<Navigate to="/listings" />}>
      <PassageAuth />
    </PassageUnAuthGuard>
  );
}

export default Home;
