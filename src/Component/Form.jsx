import "../Style/Form.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useForm } from "@formspree/react";
import countryData from "../Country.json";
import courseData from "../Course.json";

export const Form = () => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formspree setup
  const [state, submitToFormspree] = useForm("manqbrza");

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!firstName) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]/.test(firstName)) {
      newErrors.firstName = "Name must start with a letter";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-z][\w.-]*@[a-z]+\.[a-z]{2,}/.test(email)) {
      newErrors.email = "Enter a valid Email ID";
    }

    if (!country) {
      newErrors.country = "Country is required";
    } else if (!/^[A-Za-z]/.test(country)) {
      newErrors.country = "Enter a valid Country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      success();
    } else {
      setIsSubmitting(false);
    }
  };

  const success = () => {
    submitToFormspree({
      "First Name": firstName || "N/A",
      "Last Name": lastName || "N/A",
      "Email Address": email || "N/A",
      "Phone Number": (countryCode || phone) ? `${countryCode} ${phone}` : "N/A",
      Country: country || "N/A",
      Query: query || "No query",
      "Selected Course": course || "N/A",
    });

    console.log("Form submitted successfully");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setQuery("");
    setCourse("");
    setCountryCode("");
    setErrors({});
  };

  if (state.succeeded) {
    return (
      <div className="success-message_container">
        <p>🎉 We've successfully received your request!</p>
        <Button variant="contained" endIcon={<SendIcon />} className="back_btn">
          <a href="/">Need Help with Another Course?</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="form-box">
      <div className="form-container">
        <div className="image-section">
          <img src="images/offer.jpeg" alt="Promo" />
        </div>
        <div className="form-wrapper">
          <form onSubmit={onFormSubmit}>
            <p>
              <span style={{ color: "red" }}> *</span> Fill the Required Details
            </p>

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
                options={countryData.map(
                  (country) => `${country.code} ${country.name}`
                )}
                onChange={(e, newValue) => setCountryCode(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Code" />
                )}
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
              <p className="submit-text">
                Happy to assist – share your query and claim your coupon
              </p>
              <Button
                className="submit-btn"
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                disabled={isSubmitting}
              >
                Apply Now – Final Discount Inside
              </Button>
              <p className="submit-text">
                ✓ By providing your contact details you agreed to our{" "}
                <b>
                  <a href="https://www.simpliaxis.com/privacy-policy">
                    Privacy Policy
                  </a>
                </b>{" "}
                &{" "}
                <b>
                  <a href="https://www.simpliaxis.com/terms-and-conditions">
                    Terms and Conditions.
                  </a>
                </b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
