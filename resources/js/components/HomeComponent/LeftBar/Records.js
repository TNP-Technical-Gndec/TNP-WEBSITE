import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Business from "@material-ui/icons/Business";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import records from "../../../../images/Records.png";
import Avatar from "../../../../images/avatar.png";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        paddingTop: "15px",
        marginBottom: "34px",
        borderRadius: "16px",
        boxShadow: "0px 15px 30px #8a959e33",
        ["@media (min-width:1600px)"]: {
            paddingTop: "20px"
        }
    },
    media: {
        textAlign: "center"
    },
    icon: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        borderRadius: "5px",
        boxShadow: "0px 5px 15px #193b6833",
        marginRight: "10px",
        height: "30px",
        width: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Icon: {
        fontSize: "18px"
    },
    title: {
        color: theme.palette.primary.dark,
        fontSize: "22px"
    },
    handles: {
        width: "90%",
        marginBottom: "15px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "30%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    imageBox: {
        marginLeft: "10px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#e5e5e5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ["@media (min-width:1600px)"]: {
            height: "70px",
            width: "70px"
        }
    },
    imageBox2: {
        width: "40px",
        height: "40px",
        ["@media (min-width:1600px)"]: {
            height: "40px",
            width: "40px"
        }
    },
    image: {
        width: "32px",
        height: "32px",
        ["@media (min-width:1600px)"]: {
            height: "40px",
            width: "40px"
        }
    },
    textInfo: {
        width: "60%",
        paddingRight: "10px"
    },
    heading: {
        marginBottom: "10px",
        paddingLeft: "10px",
        fontSize: "18px",
        fontFamily: "Open Sans",
        fontWeight: "600",
        color: theme.palette.primary.dark,
        paddingTop: "5px",
        ["@media (min-width:1600px)"]: {
            fontSize: "20px",
            paddingTop: "12px"
        }
    },
    subheading: {
        textAlign: "left",
        padding: "10px 0px 0px 10px",
        fontSize: "15px",
        fontFamily: "Open Sans",
        fontWeight: "600",
        color: theme.palette.primary.text,
        ["@media (min-width:1600px)"]: {
            fontSize: "18px"
        }
    },
    button: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",
        marginTop: "10px",
        width: "100%",
        height: "40px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "2px solid #1687d9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            boxShadow: "0 5px 12px #1687d933"
        },
        "&:focus": {
            outline: "none"
        },
        ["@media (min-width:1600px)"]: {
            height: "50px"
        }
    },
    subheading2: {
        fontSize: "14px",
        fontFamily: "Open Sans",
        fontWeight: "600",
        color: theme.palette.primary.main,
        ["@media (min-width:1600px)"]: {
            fontSize: "16px"
        }
    }
}));

const Records = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.handles}>
                <div className={classes.imageBox}>
                    <img src={records} className={classes.image} />
                </div>
                <div className={classes.textInfo}>
                    <h3 className={classes.subheading}>Placement Records</h3>
                    <a
                        href="/placementRecords"
                        target="_blank"
                        rel="noopener"
                        style={{ textDecoration: "none" }}
                    >
                        <div className={classes.button}>
                            <Typography
                                variant="h6"
                                component="h2"
                                className={classes.subheading2}
                            >
                                View
                            </Typography>
                        </div>
                    </a>
                </div>
            </div>

            <div className={classes.handles}>
                <div className={classes.imageBox}>
                    <img src={Avatar} className={classes.imageBox2} />
                </div>
                <div className={classes.textInfo}>
                    <h3 className={classes.subheading}>Major Recruiters</h3>
                    <a
                        href="/majorRecruiters"
                        target="_blank"
                        rel="noopener"
                        style={{ textDecoration: "none" }}
                    >
                        <div className={classes.button}>
                            <Typography
                                variant="h6"
                                component="h2"
                                className={classes.subheading2}
                            >
                                View
                            </Typography>
                        </div>
                    </a>
                </div>
            </div>
        </Card>
    );
};

export default Records;
