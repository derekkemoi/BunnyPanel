import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userObject, paymentDetails } from "../../state";

import mpesaLogo from '../../assets/mpesa.png'
import {
  LinearProgress, Box, Button, Typography,
  Card, Grid, Divider, Input, FormControl, FormLabel, FormHelperText
} from "@mui/joy";
import AlertCard from "../../components/AlertCard";
import Tabs from '../../components/ResponsiveAppBar'


export default function Withdraw() {
  const navigate = useNavigate()
  const [amountError, setAmountError] = React.useState(false)
  const [withdrawError, setWithdrawError] = React.useState(false)
  const [withdrawMsg, setWithdrawMsg] = React.useState("")
  const [showProgressDialog, setProgressDialog] = useState(false);

  const [user, setUser] = useAtom(userObject)
  const [payments] = useAtom(paymentDetails)


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (payments.added) {
      if (user.accountBalance >= 1000) {
        setWithdrawError(true)
        setWithdrawMsg("You can only withdraw on 7th, 15th and 22nd of every month")
        return
      } else {
        if (data.get('amount').length < 2 || data.get('amount').length > user.minimumWithDrawal || data.get('amount').length > user.accountBalance) {
          setAmountError(true)
          return
        } else {
          setAmountError(false)
        }
      }
    } else {
      setWithdrawError(true)
      setWithdrawMsg("Payments details required. Add from your account")
      return
    }



    setProgressDialog(true)
    setTimeout(() => {
      // setPayments((prev) => ({
      //   ...prev,
      //   method: "M-PESA",
      //   mpesaName: data.get('mpesaName'),
      //   mpesaNumber: data.get('mpesaNumber'),
      //   added: true
      // }))
      setProgressDialog(false)
      navigate("/account")
    }, 5000);


    console.log({
      email: data.get('amount'),
      // password: data.get('mpesaName'),
    });
  };

  return (
    <div><Tabs />
      <Card variant="soft">
        <Typography level="h3">
          Withdraw
        </Typography>

        <Divider sx={{ mt: 0.5, mb: 0.5 }} />
        <Grid xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid>
              <Box
                component="img"
                sx={{
                  height: 70,
                  width: 100,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={mpesaLogo}
              />


              <Card size="lg">

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  {
                    withdrawError ?
                      <Typography level="h5" color="danger">
                        {withdrawMsg}
                      </Typography> : ""
                  }
                  <FormControl>
                    <FormLabel>
                      Account Balance :
                      <Typography level="title-lg">
                        Ksh {user.accountBalance}
                      </Typography>
                    </FormLabel>
                  </FormControl>
                  <FormControl required error={amountError}>
                    <FormLabel>Enter Amount</FormLabel>
                    <Input
                      margin="normal"
                      required
                      fullWidth
                      name="amount"
                      label="Enter amount"
                      type="amount"
                      id="amount"
                    />
                    {
                      amountError ? <FormHelperText>Account balance below withdrawal limit</FormHelperText> : ""
                    }
                  </FormControl>

                  {
                    showProgressDialog ? <LinearProgress /> : <div></div>
                  }
                   <Button sx={{ mt: 4 }} style={{ backgroundColor: '#00CC71', borderRadius: "5em" }} type="submit" fullWidth >
                    Withdraw
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <AlertCard message={"Payments system is selcted based on your country for convenience"} />
      </Card>
    </div>
  );
}
