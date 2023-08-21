import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <Header
        title="Profile"
        profileIcon={ profileIcon }
        iconTitle={ profileIcon }
      />
    </div>
  );
}

export default Profile;
