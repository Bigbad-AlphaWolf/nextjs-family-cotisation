import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import PhoneIcon from '@material-ui/icons/Phone';
import People from "@material-ui/icons/People";
// core components
import Header from "/components/v2/Header/Header.js";
import HeaderLinks from "/components/v2/Header/HeaderLinks.js";
import Footer from "/components/v2/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import Danger from "../../components/Typography/Danger";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [error, setError] = React.useState(null);
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const handleSubmit = (event) => {
    setError(null);
    console.log('event', event);
    console.log('event', event?.target?.fullName.value);
    console.log('event', event?.target?.tel.value);
    event.preventDefault();
    const fullName = event.target?.fullName.value;
    const telephone = event.target?.tel.value;
    const regexOnlyString = /^(\w+ ?)*$/;
    const regexSNNumber = /^((\+221|00221|221) ?)?(7(0|6|7|8){1}) ?([0-9]{3}) ?([0-9]{2}) ?([0-9]{2})$/;
    if(regexOnlyString.test(fullName) && regexSNNumber.test(telephone )) {
        console.log('OK', telephone, fullName);
    } else if(telephone && fullName) {
      console.log('here');
      console.log(telephone, fullName);
      setError(
        <Danger>
          Veuillez vérifier les valeurs renseignées: Le champ nom/Prénom ne doit contenir aucun nombre, le champ téléphone n'autorise pour l'instant que les numéros du Sénégal.
        </Danger>
      )
    }

  }
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Cotisation Familiale"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Accéder à l'application</h4>
                  </CardHeader>
                  <p className={classes.subtitleTitleLogin}>Veuillez remplir ce formulaire pour accéder à l'interface</p>
                  <CardBody>
                    <CustomInput
                      labelText="Prénom Nom..."
                      id="fullName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => {
                        console.log('event: ' + e);
                      }}
                    />
                    <CustomInput
                      labelText="Teléphone..."
                      id="tel"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "tel",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" color="primary" size="lg">
                      Je me connecte
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    {error}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
