import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import Config from "../../config";
import withLogin from "../../components/util/withLogin";

function ProfilePage({ error, user }) {
  return (
    <Layout>
      <h3>Profile Page</h3>
      <h1 style={{ display: "inline" }}>{user.name}</h1>
      <p style={{ display: "inline", marginLeft: "1rem" }}>
        <code>{user._id}</code>
      </p>
      <p>[{user.role}]</p>
      <p>{user.email}</p>
    </Layout>
  );
}

export default withLogin(ProfilePage, null, "/login");
