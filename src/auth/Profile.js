// src/auth/Profile.js
import { useAuth } from "./AuthContext";

export function Profile() {
  const { user, logOut } = useAuth();

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logOut} className="logout-btn">
        Log Out
      </button>
    </div>
  );
}