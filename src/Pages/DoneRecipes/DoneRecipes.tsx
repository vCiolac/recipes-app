import Header from '../../components/Header/Header';
import profileIcon from '../../images/profileIcon.svg';
import doneIcon from '../../images/DoneIcon.png';

function DoneRecipes() {
  return (
    <div>
      <Header
        title="Done Recipes"
        profileIcon={ profileIcon }
        iconTitle={ doneIcon }
      />
    </div>
  );
}

export default DoneRecipes;
