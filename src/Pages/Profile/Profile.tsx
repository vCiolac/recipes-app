import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';

function Profile() {
  return (
    <>
      <Header
        title="Profile"
        profileIcon={ profileIcon }
        iconTitle={ profileIcon }
      />
      <Footer />
    </>
  );
}

export default Profile;
