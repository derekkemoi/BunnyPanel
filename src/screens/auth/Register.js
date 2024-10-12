import React, { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import ColorSchemeToggle from '../../components/ColorSchemeToggle';
import { Avatar, Card, CardContent, CircularProgress, LinearProgress, Option, Select } from '@mui/joy';
import { useAtom } from 'jotai';
import { useNavigate } from "react-router-dom";
import url from '../../logo.png'
import kenyaFlag from '../../kenya.png'
// import signupImage from '../../student.jpeg'

import { userObject, userLoggedIn } from "../../state";

import { Key } from '@mui/icons-material';
<ColorSchemeToggle />

const customTheme = extendTheme({ defaultColorScheme: 'dark' });

export default function JoySignInSideTemplate() {
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate("/home")
  }

  function randomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [user, setUser] = useAtom(userObject)
  const [loggedIn, setLoggedIn] = useAtom(userLoggedIn)
  const [progress, setProgress] = useState(false);
  const [password, setPassword] = React.useState('');
  const minLength = 12;

  const randomStr = (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
      ans +=
        arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans
  }

  if (loggedIn) {
    navigate("/home")
  }

  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.1)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <Typography level="title-lg">BUNNY SURVEYS</Typography>
              <Avatar variant={"rounded"} alt="The image" src={url} style={{
                width: 38,
                height: 38,
              }} />
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 2, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h2" level="h2">
                  Register
                </Typography>
                <Divider
                  sx={(theme) => ({
                    [theme.getColorSchemeSelector('light')]: {
                      color: { xs: '#FFF', md: 'text.tertiary' },
                    },
                  })}
                >
                </Divider>
              </Stack>
              {/* <Card variant="outlined">
                <CardContent>
                  <Typography component="h1" level="h5">
                    You can qualify for Ksh. 3,000 - 45,000 loan to MPESA
                  </Typography>
                </CardContent>
              </Card> */}

            </Stack>
            <Stack>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  var amount = 0
                  // if (formJson.loan === "Personal") {
                  //   amount = randomAmount(1000, 5000)
                  // }
                  // if (formJson.loan === "Educational") {
                  //   amount = randomAmount(10000, 20000)
                  // }
                  // if (formJson.loan === "Car") {
                  //   amount = randomAmount(30000, 50000)
                  // }
                  // if (formJson.loan === "Rental") {
                  //   amount = randomAmount(5000, 15000)
                  // }
                  setProgress(true)
                  setTimeout(() => {
                    setUser((prev) => ({
                      ...prev,
                      trackingID: Math.random().toString(36).slice(2),
                      firstName: formJson.firstName,
                      lastName: formJson.lastName,
                      education: formJson.education,
                      email: formJson.email,
                      password: password,
                      referralCode: randomStr(10, '12345ABCDE')
                    }))
                    setProgress(false)
                    setLoggedIn(true)
                    navigateToHome()
                  }, 5000)

                  // alert(JSON.stringify(data));
                }}
              >
                <FormControl required>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="firstName"
                    placeholder="Enter your last name"
                    name="firstName"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="lastName"
                    placeholder="Enter your last name"
                    name="lastName"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Eligibility Level (This help us pick suitable surveys for you)</FormLabel>
                  <Select
                    placeholder="Select loan type"
                    name="loan"
                    required
                  >
                    <Option value="High School">High School Level</Option>
                    <Option value="Degree">Undegraduate Level(Degree)</Option>
                    <Option value="Masters">Postgraduate Level (Masters)</Option>
                    <Option value="Doctoral">Postgraduate Level (Doctoral)</Option>
                  </Select>
                </FormControl>
                <FormControl required>
                  <FormLabel>Country of residence</FormLabel>
                  <Input
                    type="text"
                    defaultValue="Kenya"
                    endDecorator={
                      <Avatar variant={"rounded"} alt="flag" src={kenyaFlag} style={{
                        width: 24,
                        height: 24,
                      }} />
                    }
                    disabled
                    name="country"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Stack spacing={0.5} sx={{ '--hue': Math.min(password.length * 10, 120) }}>
                  <Input
                    type="password"
                    placeholder="Enter your account password"
                    required
                    startDecorator={<Key />}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <LinearProgress
                    determinate
                    size="sm"
                    value={Math.min((password.length * 100) / minLength, 100)}
                    sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
                  />
                  <Typography
                    level="body-xs"
                    sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
                  >
                    {password.length < 3 && 'Very weak'}
                    {password.length >= 3 && password.length < 6 && 'Weak'}
                    {password.length >= 6 && password.length < 10 && 'Strong'}
                    {password.length >= 10 && 'Very strong'}
                  </Typography>
                  </Stack>
                </FormControl>

                <Box
                    sx={{
                      // display: 'flex',
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {
                      progress ? <CircularProgress variant="solid" color="success" /> : ""
                    }
                  </Box>

                <Button style={{ backgroundColor: '#00CC71', borderRadius: "5em" }}  type="submit" fullWidth >
                  CONFIRM REGISTRATION
                </Button>

              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }} backgroundColor='primary.main'>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © Mkopo Pawa {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${signupImage})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              `url(${signupImage})`,
          },
        })}
      /> */}
    </CssVarsProvider>
  );
}
