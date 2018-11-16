import React, { Component } from "react";
import "./App.css";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
//import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Popup from "reactjs-popup";
const style = {
  position: "relative",
  margin: "50px auto"
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const PackageRegex = RegExp(/^\d{1,6}(?:\.\d{0,2})?$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      CurrentCompanyName: null,
      CurrentPackage: null,
      ExpectedPackage: null,
      CurrentLocation: null,
      PermanentLocation: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        technology: "",
        CurrentCompanyName: "",
        CurrentPackage: "",
        ExpectedPackage: "",
        CurrentLocation: "",
        PermanentLocation: ""
      },
      selectedDate: "",
      techData: ["Select", "Web Development"],
      eduData: ["Select", "BCA", "Btech"],
      desigData: ["Select", "Web Developer"],
      collegeData: [
        "Select",
        "Lovely Professional University",
        "Chandigarh University"
      ]
    };
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "CurrentCompanyName":
        formErrors.CurrentCompanyName =
          value.length < 6 ? "minimum 6 characaters required" : "";
      case "CurrentPackage":
        formErrors.CurrentPackage = PackageRegex.test(value) ? "" : "invalid";
        break;
      case "ExpectedPackage":
        formErrors.ExpectedPackage = PackageRegex.test(value) ? "" : "invalid";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  onChange(date) {
    this.setState({
      selectedDate: date
    });
  }
  handleAdd(e) {
    //  e.preventDefault();
    const { desigData } = this.state;
    const newItem = this.newItem.value;

    this.setState(
      {
        desigData: [...this.state.desigData, newItem]
      },
      () => (this.newItem.value = "")
    );
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Resume Input</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="technology">
              Technology:
              {/*}<select value={this.state.value} onChange={this.handleChange}>
                <option value="default" selected="selected">
                  Select
                </option>
                
              </select>*/}
              <select>
                {this.state.techData.map((x, y) => (
                  <option key={y} className="techOption">
                    {x}
                  </option>
                ))}
              </select>
              <Popup trigger={<button> Add</button>}>
                <div>
                  <input />
                </div>
              </Popup>
            </div>
            <div className="gender">
              Gender:
              <input type="radio" value="option1" checked={true} />
              Male
              <input type="radio" value="option2" />
              Female
              <input type="radio" value="option3" />
              Others
            </div>
            <div className="technology">
              DOB:
              <DatePickerInput
                onChange={this.onChange}
                value={this.state.selectedDate}
                className="my-custom-datepicker-component"
              />
            </div>
            <div className="gender">
              Experience:
              <input type="radio" value="option1" checked={true} />
              0-1
              <input type="radio" value="option2" />
              1-2
              <input type="radio" value="option3" />
              More
            </div>
            <div className="package">
              <label htmlFor="Package">Package(current)</label>
              <input
                className={
                  formErrors.CurrentPackage.length > 0 ? "error" : null
                }
                placeholder="in rupee"
                type="text"
                name="CurrentPackage"
                noValidate
                onChange={this.handleChange}
              />
              pa
              {formErrors.CurrentPackage.length > 0 && (
                <span className="errorMessage">
                  {formErrors.CurrentPackage}
                </span>
              )}
            </div>
            <div className="package">
              <label htmlFor="Package">Package(Expected)</label>
              <input
                className={
                  formErrors.ExpectedPackage.length > 0 ? "error" : null
                }
                placeholder="in rupee"
                type="text"
                name="ExpectedPackage"
                noValidate
                onChange={this.handleChange}
              />
              pa
              {formErrors.ExpectedPackage.length > 0 && (
                <span className="errorMessage">
                  {formErrors.ExpectedPackage}
                </span>
              )}
            </div>
            <div className="noticePeriod">
              Notice Period:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="default" selected="selected">
                  Select
                </option>
                <option value="">Na</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
                <option value="">6</option>
                <option value="">7</option>
                <option value="">8</option>
              </select>
              months
            </div>

            <div className="technology">
              Education:
              {/*<select value={this.state.value} onChange={this.handleChange}>
                <option value="default" selected="selected">
                  Select
                </option>
                <option value="">Btech</option>
                <option value="">BCA</option>
                 <option value="">MCA</option>
                <option value="">Others</option>
              </select>*/}
              <select>
                {this.state.eduData.map((x, y) => (
                  <option key={y} className="techOption">
                    {x}
                  </option>
                ))}
              </select>
              <Popup trigger={<button> Add</button>}>
                <div>
                  <input />
                </div>
              </Popup>
            </div>
            <div className="technology">
              College:
              {/*}  <select value={this.state.value} onChange={this.handleChange}>
                <option value="default" selected="selected">
                  Select
                </option>
                <option value="">Lovely Professional University</option>
                <option value="">Chandigarh University</option>
                <option value="">Gne</option>
                <option value="">Others</option>
                </select>*/}
              <select>
                {this.state.collegeData.map((x, y) => (
                  <option key={y} className="techOption">
                    {x}
                  </option>
                ))}
              </select>
              <Popup trigger={<button> Add</button>}>
                <div>
                  <input />
                </div>
              </Popup>
            </div>

            <div className="technology">
              Marital Status:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="default" selected="selected">
                  Select
                </option>
                <option value="">Unmarried</option>
                <option value="">Married</option>
              </select>
            </div>
            <div className="technology">
              Designation(Previous Company):
              {/* <select value={this.state.value} onChange={this.handleChange}>
                <option value="default" selected="selected">
                  Select
                </option>
                <option value="">Web Developer</option>
                <option value="">Android Developer</option>
                <option value="">Others</option>
                </select>*/}
              <select>
                {this.state.desigData.map((x, y) => (
                  <option key={y} className="techOption">
                    {x}
                  </option>
                ))}
              </select>
              <Popup trigger={<button> Add</button>}>
                <div>
                  <form
                    onSubmit={e => {
                      this.handleAdd(e);
                    }}
                  >
                    <input
                      ref={input => (this.newItem = input)}
                      type="text"
                      placeholder="Input"
                    />
                    <button type="submit">Save</button>
                  </form>
                </div>
              </Popup>
            </div>
            <div className="technology">
              <label htmlFor="firstName">Current Company</label>
              <input
                className={
                  formErrors.CurrentCompanyName.length > 0 ? "error" : null
                }
                placeholder="Current Company Name"
                type="text"
                name="CurrentCompanyName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.CurrentCompanyName.length > 0 && (
                <span className="errorMessage">
                  {formErrors.CurrentCompanyName}
                </span>
              )}
            </div>
            <div className="technology">
              <label htmlFor="CurrentLocation">Location(current)</label>
              <input
                className={
                  formErrors.CurrentLocation.length > 0 ? "error" : null
                }
                placeholder="Current CurrentLocation"
                type="text"
                name="CurrentLocation"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.CurrentLocation.length > 0 && (
                <span className="errorMessage">
                  {formErrors.CurrentLocation}
                </span>
              )}
            </div>
            <div className="technology">
              <label htmlFor="PermanentLocation">Location(Permanent)</label>
              <input
                className={
                  formErrors.PermanentLocation.length > 0 ? "error" : null
                }
                placeholder="Permanent Location"
                type="text"
                name="PermanentLocation"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.PermanentLocation.length > 0 && (
                <span className="errorMessage">
                  {formErrors.PermanentLocation}
                </span>
              )}
            </div>
            <div className="technology">
              <div>Reason for leave</div>
              <textarea
                value={this.state.value}
                onChange={this.handleChange}
                cols={40}
                rows={10}
              />
            </div>
            <div className="technology">
              <div>Last Contacted</div>
              <textarea
                value={this.state.value}
                onChange={this.handleChange}
                cols={40}
                rows={2}
              />
            </div>
            <div className="technology">
              <div>Remarks</div>
              <textarea
                value={this.state.value}
                onChange={this.handleChange}
                cols={40}
                rows={10}
              />
            </div>

            {/*}  <div className="password">
              <label htmlFor="password">Technology</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
              </div>{*/}
            <div className="createAccount">
              <button type="submit" onSubmit="">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
