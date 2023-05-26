import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {Dashboard,Vendor,VendorDetail} from './pages';
import React from 'react';
import {Alert,AppBar,Avatar,Box,Button,Container,IconButton,Menu,MenuItem,Snackbar,Toolbar,Tooltip,Typography} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import {useSelector} from 'react-redux';
import {IGlobalStoreState} from './redux/store';
import {setErrorSnackBarMessage,setSnackBarMessage} from './redux';
import {IGlobalProp,IState} from './interfaces';
import axios from 'axios';
import {API_URL} from './shared';
import underscore from 'underscore';

function App() {
  const [anchorElUser,setAnchorElUser]=React.useState<null|HTMLElement>(null);
  const [showSnackBar,setShowSnackbar]=React.useState<boolean>(false);
  const [showErrorSnackBar,setShowErrorSnackbar]=React.useState<boolean>(false);
  const [statesData,setStatesData]=React.useState<Array<string>>([])
  const handleOpenUserMenu=(event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const snackBarMessage=useSelector((state: IGlobalStoreState) => state.appReducer).snackBarMessage;
  const snackBarErrorMessage=useSelector((state: IGlobalStoreState) => state.appReducer).snackBarErrorMessage;

  React.useEffect(() => {
    setShowErrorSnackbar(snackBarErrorMessage.length>0)
  },[snackBarErrorMessage]);

  React.useEffect(() => {
    getMasterData()
  },[]);

  const getMasterData=async () => {
    const states=axios.get(API_URL+"/masterData/getStates")
    const anonymousLogin=axios.post(API_URL+"/users/anonymousLogin")
    axios.all([states,anonymousLogin]).then((response) => {
      const onlyStates=response[0].data.map((d: IState) => d.state_name);
      const uniqData=underscore.uniq(onlyStates);
      setStatesData(uniqData)
      const token=response&&response[1].headers&&response[1].headers.get&&response[1].headers.token
      localStorage.setItem("token",token)
    })
  }

  React.useEffect(() => {
    setShowSnackbar(snackBarMessage.length>0)
  },[
    snackBarMessage
  ])

  const handleCloseNavMenu=(page: string) => {
    window.location.href=page.toLowerCase()
  };

  const handleCloseUserMenu=() => {
    setAnchorElUser(null);
  };

  const pages=['Home','Vendor'];
  const settings=['Profile','Account','Dashboard','Logout'];

  return (
    <BrowserRouter>
      <Box>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{display: {xs: 'none',md: 'flex'},mr: 1}} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: {xs: 'none',md: 'flex'},
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Tem
              </Typography>

              <AdbIcon sx={{display: {xs: 'flex',md: 'none'},mr: 1}} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: {xs: 'flex',md: 'none'},
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{flexGrow: 1,display: {xs: 'none',md: 'flex'}}}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu(page)
                    }}
                    sx={{my: 2,color: 'white',display: 'block'}}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {
        showErrorSnackBar&&(
          <Snackbar
            anchorOrigin={
              {
                vertical: 'top',
                horizontal: 'right'
              }
            }
            open={showErrorSnackBar}
            autoHideDuration={5}
          >
            <Alert
              onClose={() => {
                setErrorSnackBarMessage('')
              }}
              severity={'error'} sx={{width: '100%'}}>
              {snackBarErrorMessage}
            </Alert>
          </Snackbar>
        )
      }

      {
        showSnackBar&&(
          <Snackbar
            anchorOrigin={
              {
                vertical: 'top',
                horizontal: 'right'
              }
            }
            open={showSnackBar}
            autoHideDuration={5}
          >
            <Alert
              onClose={() => {
                setSnackBarMessage('')
              }}
              severity={'success'} sx={{width: '100%'}}>
              {snackBarMessage}
            </Alert>
          </Snackbar>
        )
      }

      <Routes>
        <Route path='/'
          element={
            <Dashboard states={statesData} />
          }
        />
        <Route path='/home'
          element={
            <Dashboard states={statesData} />
          }
        />
        <Route path='/vendor'
          element={
            <Vendor states={statesData} />
          }
        />
        <Route path='/vendor-detail/:uuid'
          element={
            <VendorDetail states={statesData} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
