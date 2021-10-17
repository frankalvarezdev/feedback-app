import { useEffect } from 'react'
import Auth from 'pages/Auth'
import { supabase } from 'lib/supabase'
import {
	BrowserRouter as Router
} from "react-router-dom"
import TabMenu from 'components/layout/TabMenu'
import Routes from 'AppRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { addSessionAction } from 'redux/actionCreators'

const App = () => {
	const session = useSelector(state => state.session);
	
	const dispatch = useDispatch();
	
	useEffect(() => {

		dispatch(addSessionAction(supabase.auth.session()))

		supabase.auth.onAuthStateChange((_event, session) => {
			dispatch(addSessionAction(session))
		})
	}, [dispatch]);

	return (
		<Router>
			<div>

				{!session ? <Auth /> : (
					<>
						<Routes />

						<TabMenu />
					</>
				)}
			</div>
		</Router>
	)
}

export default App;