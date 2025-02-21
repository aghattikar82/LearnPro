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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useForm } from '@formspree/react';
import courseData from "../Course.json"
import countryData from "../Country.json"



export const Form = () => {

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [indOrgValue, setIndOrgValue] = useState('Individual');

  const [userlocation, setUserLocation] = useState({ latitude: null, longitude: null });

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const onFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        setIsSubmitting(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("Geolocation is not supported by this browser.");
            setIsSubmitting(false);
        }
    } else {
        setIsSubmitting(false);
    }
};

const success = async (position) => {
    // const { latitude, longitude } = position.coords;
    // setUserLocation({ latitude, longitude });

    // const address = await getAddressFromCoordinates(latitude, longitude);

    submitToFormspree({
        "First Name": firstName || "N/A",  
        "Last Name": lastName || "N/A",
        "Email Address": email || "N/A",
        "Phone Number": (countryCode || phone) ? `${countryCode} ${phone}` : "N/A",
        "Company Name": company || "N/A",
        "Location": location || "N/A",
        // "Coordinate": `Latitude: ${latitude}, Longitude: ${longitude}`,
        // "Address": address || "N/A",
        "Query": query || "No query",
        "Selected Course": course || "N/A",
        "Individual/Organizational": indOrgValue || "N/A"
    });

    console.log('Form submitted successfully');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setLocation('');
    setQuery('');
    setCourse('');
    setCountryCode('');
    setIndOrgValue('Individual');
    setErrors({});
};

const error = () => {
    alert("Unable to retrieve your location.");
    setIsSubmitting(false);
};

if (state.succeeded) {
    return (
        <div className="success-message_container">
            <p>Thanks for joining!</p> 
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                className="back_btn"
            >
                <a href="">If anything else</a>
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
    <div className='form_container'>
      <div className="form_box">
        <div className="form_banner">
         <h2> Boost Your Career with Valuable Certification </h2>
        </div>
        <form onSubmit={onFormSubmit}>
            <div className="form_section">
              <TextField
                id="first-name"
                label={
                  <>
                    First Name<span style={{ color: "red" }}> *</span>
                  </>
                }
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={{ width: "100%" }}
                size="small"
              />
              <TextField
                id="last-name"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ width: "100%" }}
                size="small"
              />
            </div>
          <div className="form_section">
             <TextField
              id="email"
              label={
                <>
                Email ID<span style={{ color: "red" }}> *</span>
              </>
              }
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ width: "100%" }}
              size="small"
            />
            <TextField
              id="company-name"
              label="Company Name"
              variant="outlined"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              sx={{ width: "100%" }}
              size="small"
            />
           
          </div>
          <div className="form_section form_section_phone">
           

            <div className="phone_num_subsection">
              <Autocomplete
                disablePortal
                options={countryData.map(country => `${country.code} ${country.name}`)}
                onChange={(e, newValue) => setCountryCode(newValue)}
                renderInput={(params) => <TextField {...params} label="Code" />}
                sx={{ width: "300px" }}
                size="small"
              />


              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{ width: "100%" }}
                size="small"
              />
            </div>
          </div>

          

          <div className="form_section form_section_loc">
            {/* <Autocomplete
              disablePortal
              options={courseData}
              onChange={(e, newValue) => setCourse(newValue)}
              renderInput={(params) => <TextField {...params} label="Course Name" />}
              sx={{ width: "100%" }}
              size="small"
            /> */}
             <TextField
              id="location"
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ width: "100%" }}
              size="small"
            />

            <FormControl sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
              <FormLabel id="ind-org-label">Individual/Organizational:</FormLabel>
              <RadioGroup
                row
                aria-labelledby="ind-org-label"
                name="row-radio-buttons-group"
                value={indOrgValue}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="Organizational" control={<Radio />} label="Organizational" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="form_section">
          <TextField
                id="course"
                label="Course"
                variant="outlined"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                
                sx={{ width: "100%" }}
                size="small"
              />
          </div>
          <div className="form_section">
            <TextField
              id="query"
              label="Type your Query"
              multiline
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>

          <div className="form_section">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
