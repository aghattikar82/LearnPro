import "../Style/Form.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useForm } from '@formspree/react';
import countryData from "../Country.json"
import courseData from "../Course.json";




export const Form = () => {

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');

  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [indOrgValue, setIndOrgValue] = useState('Individual');

  // const [userlocation, setUserLocation] = useState({ latitude: null, longitude: null });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


//   User ID
  const [state, submitToFormspree] = useForm("manqbrza"); 

  const handleRadioChange = (event) => {
    setIndOrgValue(event.target.value);
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!firstName) {
        newErrors.firstName = 'First Name is required';
    } else if (!/^[A-Za-z]/.test(firstName)) {
        newErrors.firstName = 'Name must start with a letter';
    }

    if (!email) {
        newErrors.email = 'Email is required';
    } else if (!/^[a-z][\w.-]*@[a-z]+\.[a-z]{2,}/.test(email)) {
        newErrors.email = 'Enter a valid Email ID';
    }

    if (!country) {
        newErrors.country = 'Country is required';
    } else if (!/^[A-Za-z]/.test(country)) {
        newErrors.country = 'Enter a valid Country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const onFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        setIsSubmitting(true);
      // alert("come")
      success()
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(success, error);
        // } else {
        //     alert("Geolocation is not supported by this browser.");
        //     setIsSubmitting(false);
        // }
    } else {
      // alert("not come")
        setIsSubmitting(false);
    }
};

const success =  () => {
    // const { latitude, longitude } = position.coords;
    // setUserLocation({ latitude, longitude });

    // const address = await getAddressFromCoordinates(latitude, longitude);

    submitToFormspree({
        "First Name": firstName || "N/A",  
        "Last Name": lastName || "N/A",
        "Email Address": email || "N/A",
        "Phone Number": (countryCode || phone) ? `${countryCode} ${phone}` : "N/A",
        // "Company Name": company || "N/A",
        "Country": country || "N/A",  // Updated from Location to Country
        // "Coordinate": `Latitude: ${latitude}, Longitude: ${longitude}`,
        // "Address": address || "N/A",
        "Query": query || "No query",
        "Selected Course": course || "N/A",
        // "Individual/Organizational": indOrgValue || "N/A"
    });

    console.log('Form submitted successfully');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setCountry('');
    setQuery('');
    setCourse('');
    setCountryCode('');
    setIndOrgValue('Individual');
    setErrors({});
};



if (state.succeeded) {
    return (
        <div className="success-message_container">
            <p>🎉 We've successfully received your request!</p>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                className="back_btn"
              >
                <a href="">Need Help with Another Course?</a>
              </Button>
        </div>
    );
}




// try

// const getAddressFromCoordinates = async (latitude, longitude) => {
//     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    
//     if (!response.ok) {
//         throw new Error("Failed to fetch address");
//     }

//     const data = await response.json();
//     if (data.display_name) {
//         return data.display_name; // Return the formatted address
//     } else {
//         throw new Error("No address found");
//     }
// };




  return (
<div className="form-wrapper">
  <div className="promo-banner">
    <div className="banner-content">
      <h2>
        <span>Exclusive Offer</span>
      </h2>
      <p align="Center">
        Get Upto <span><b>60% Off</b> </span>on All Courses! <br />
      </p>
    </div>
  </div>

  <form onSubmit={onFormSubmit}>
    <div className="form-group">
      <TextField
        id="first-name"
        label={
          <>
            Full Name<span style={{ color: "red" }}> *</span>
          </>
        }
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
        size="small"
      />
    </div>

    <div className="form-group">
      <TextField
        id="email"
        label={
          <>
            Email <span style={{ color: "red" }}> *</span>
          </>
        }
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        size="small"
      />
    </div>


    <div className="form-group-row">
  <Autocomplete
    disablePortal
    options={countryData.map((country) => `${country.code} ${country.name}`)}
    onChange={(e, newValue) => setCountryCode(newValue)}
    renderInput={(params) => <TextField {...params} label="Code" />}
    size="small"
    sx={{ width: "20%" }}
  />

  <TextField
    id="phone"
    label="Phone"
    variant="outlined"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    error={!!errors.phone}
    helperText={errors.phone}
    size="small"
    sx={{ width: "77%" }}
  />
</div>


    <div className="form-group">
      <TextField
        id="country"
        label={
          <>
            Country <span style={{ color: "red" }}> *</span>
          </>
        }
        variant="outlined"
        error={!!errors.country}
        helperText={errors.country}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        size="small"
      />
    </div>

    <div className="form-group">
      <Autocomplete
        disablePortal
        options={courseData.courseList}
        onChange={(e, newValue) => setCourse(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <>
                Course Name<span style={{ color: "red" }}> *</span>
              </>
            }
          />
        )}
        size="small"
      />
    </div>

    <div className="form-group">
      <TextField
        id="query"
        label="Need Info? Just type your query here"
        multiline
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

    <div className="form-group submit-wrapper">
  <p className="submit-text">Happy to assist – share your query and claim your coupon</p>
  <Button
    className="submit-btn"
    variant="contained"
    endIcon={<SendIcon />}
    type="submit"
    disabled={isSubmitting}
  >
    Get Your Special Discount
  </Button>
</div>

  </form>
</div>
  );
};
