import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-tagsinput/react-tagsinput.css";
import "../../../../css/app.css";
import TagsInput from "react-tagsinput";
import addNotification from "react-push-notification";
import toast, { Toaster } from "react-hot-toast";
import { Accordion, AccordionDetails, AccordionSummary, Chip, Input, Menu, MenuItem, Select, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = theme => ({
    layout: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundColor: theme.palette.secondary.main,
        // padding: "10px 10px",
        borderRadius: "12px"
    },
    label: {
        color: theme.palette.primary.dark,
        fontWeight: "600"
    },
    btn: {
        border: "none",
        borderRadius: "16px",
        textDecoration: "none",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        padding: "5px 30px",
        marginTop: "15px",
        boxShadow: "0px 15px 25px #038ed433"
    }
});

class CreatePosts extends React.Component {
    state = {
        title: "",
        type: "",
        description: "",
        editorState: EditorState.createEmpty(),
        tags: [],
        companyDetails: {
            companyName: "",
            branches: []
        }
    };

    handleChange(tags) {
        this.setState({ tags });
    }

    setCompanyDetails = (name) => {
        this.setState({
            companyDetails: {
                ...this.state.companyDetails,
                [name.target.name]: name.target.value
            }
        });
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.saveEditorContent(html);
    };

    saveEditorContent(data) {
        this.setState({ description: data });
    }
    AddCompany = async e => {
        try {
            e.preventDefault();
            let payload = { ...this.state.companyDetails };
            const res = await axios.post("https://tnp-vault.vercel.app/company",
                {
                    "name": payload.companyName,
                    "email": payload.companyEmail,
                    "phone": payload.companyPhone,
                    "branches": payload.branches,
                    "status": "Awaiting Confirmation"
                },
                {
                    headers: {
                        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRucHN1cGVyYWRtaW4iLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTcyMzMwNjMyNn0.Pj5V_xfT3lnRnIMbIUpbWmHribCpJJmv9pR1CYmYBns"
                    }
                }
        );
            if (res.status === 201) {
                toast.success("Company Added Successfully");
                this.setState({
                    AddCompanyExpanded: false
                })
            } else {
                toast.error("Error Adding Company");
                console.log(res)
                this.setState({
                    AddCompanyExpanded: false
                })
            }
        }
        catch (err) {
            console.log(err)
            this.setState({
                AddCompanyExpanded: false
            })
            toast.error("Error Adding Company");
        }
    }

    savePost = async e => {
        try {
            e.preventDefault();
            let payload = { ...this.state };
            delete payload.editorState;
            const res = await axios.post("/addPost", payload);
            if (res.data.status === 200) {
                toast.success("Post Added Successfully");
                this.setState({
                    title: "",
                    type: "",
                    description: "",
                    editorState: EditorState.createEmpty(),
                    tags: []
                });
            } else {
                toast.error("Error Adding Post");

            }
        } catch (err) {
            toast.error("Error Adding Post. Please contact the admin");
        }
    };
    handleClose = () => {
        this.setState({ open: true });
    };
    
    handleOpen = () => {
        this.setState({ open: false });
    };
    

    render() {
        const { editorState } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.layout}>
                <div className="actionDiv">
                    <Accordion expanded={this.state.AddCompanyExpanded} style={{marginBottom: "10px"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Add New Company</Typography>
                        </AccordionSummary>
                        <AccordionDetails  >
                        <div style={{width: "100%"}}>
                            <form onSubmit={this.AddCompany}>
                                <div className="form-group">
                                    <label className={classes.label}>Company Name:</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        className="form-control highlight"
                                        value={this.state.companyDetails.companyName}
                                        onChange={this.setCompanyDetails}
                                        placeholder="Enter the Company Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className={classes.label}>Company Email:</label>
                                    <input
                                        type="text"
                                        name="companyEmail"
                                        className="form-control highlight"
                                        value={this.state.companyDetails.companyEmail}
                                        onChange={this.setCompanyDetails}
                                        placeholder="Enter the Company Email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className={classes.label}>Company Phone:</label>
                                    <input
                                        type="text"
                                        name="companyPhone"
                                        className="form-control highlight"
                                        value={this.state.companyDetails.companyPhone}
                                        onChange={this.setCompanyDetails}
                                        placeholder="Enter the Company Phone"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className={classes.label}>Branches:</label>
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple
                                        name="branches"
                                        className="form-control highlight"
                                        onClose={this.handleClose}
                                        onOpen={this.handleOpen}
                                        open={this.state.open}
                                        value={this.state.companyDetails.branches}
                                        onChange={this.setCompanyDetails}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        // MenuProps={MenuProps}
                                    >
                                        {["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AI&ML"].map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                        ))}
                                    </Select>
                                </div>

                                <button type="submit" className={classes.btn}>
                                    Add Company
                                </button>
                            </form>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.Formdiv}>
                        <form onSubmit={this.savePost}>
                            <div className="form-group">
                                <label className={classes.label}>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control highlight"
                                    value={this.state.title}
                                    onChange={this.handleInput}
                                    placeholder="Enter the Title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <Toaster />
                                <label className={classes.label}>Type:</label>
                                <select
                                    name="type"
                                    className="form-control highlight"
                                    value={this.state.type}
                                    onChange={this.handleInput}
                                    required
                                >
                                    <option value="" selected>
                                        Select the Type
                                    </option>
                                    <option value="Announcement">
                                        Announcement
                                    </option>
                                    <option value="Selection">Selection</option>
                                    <option value="Placement">Placement</option>
                                    <option value="Training">Training</option>
                                    <option value="Internship">
                                        Internship
                                    </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className={classes.label}>
                                    Description:
                                </label>
                                <div className={classes.description}>
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={
                                            this.onEditorStateChange
                                        }
                                    />
                                </div>
                            </div>
                            <label className={classes.label}>Tags:</label>
                            <TagsInput
                                value={this.state.tags}
                                onChange={tags => this.handleChange(tags)}
                            />
                            <div className="form-group">
                                <button type="submit" className={classes.btn}>
                                    Add Post
                                </button>
                                {/* <Button variant="contained" color="primary">
                                  Add Post
                                </Button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(CreatePosts);
