import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './NavigationHeader.css';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="navigation-buttons">
      <button 
        className="nav-button back-button"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={24} />
      </button>
    </div>
  );
};

export default NavigationButtons;