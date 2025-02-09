import { Outlet } from "react-router-dom"; 
import Header from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";

const MainLayout = () => {
	const { error } = useError()
	const { loading } = useLoading()

	if (loading) {
		return (
		  <div className="message-container">
			<div className="loading">
			  <span className="message-icon">⏳</span> Loading ...
			</div>
		  </div>
		);
	  }
	if (error) {
        // Network error handling
        if (error.toLowerCase().includes("failed to fetch")) {
          return (
            <div className="message-container">
              <div className="error-network">
                <span className="message-icon">⚠️</span> There was a problem connecting to the server. Please check your internet connection and try again.
              </div>
            </div>
          );
        }
      
        // Generic error handling
        return (
          <div className="message-container">
            <div className="error-server">
              <span className="message-icon">💥</span> Something went wrong while fetching the data. Please try again later.
            </div>
          </div>
        );
      }
	return (
		<div>
			<header >
				<Header />
			</header>
			<main style={{ paddingTop: "80px" }}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
