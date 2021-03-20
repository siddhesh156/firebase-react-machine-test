import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUserData } from '../../Redux'
import {useDispatch, useSelector} from "react-redux"
import { DateRange } from '@material-ui/icons'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	  }
})

function Dashboard(props) {
	const { classes } = props

	const [quote, setQuote] = useState('')
	const data = useSelector(state => state.users.userData);

	const dispatch = useDispatch()

	useEffect(() => {
		firebase.getCurrentUserData().then(snapshot => {
			dispatch({ type: "GET_USER_DATA", userData:snapshot })
		  })
		
		console.log("data ",data)
	},[])

	
	
    if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
					<div style={{alignSelf:"center"}}>
					
					<Avatar alt="firebase-image" src={data.url || "http://via.placeholder.com/300"}  className={classes.large} />
					
					</div>
					
				<Typography component="h1" variant="h5">
					First Name: {data.name ? `${data.name}` : <CircularProgress size={20} />}
				</Typography>
				{/* <Typography component="h1" variant="h5">
					Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
				</Typography> */}
				<Typography component="h1" variant="h5">
					Last Name: {data.lname ? `${data.lname}` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Age: {data.age ? `${data.age}` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Phone: {data.phone ? `${data.phone}` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Address: {data.address ? `${data.address}` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/editData"
					className={classes.submit}>
					Edit
          		</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))