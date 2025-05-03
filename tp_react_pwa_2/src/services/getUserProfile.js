const getUserProfile = async (token) => {
    if (!token) {
      throw new Error("Access token is missing.")
    
    }

    let data;

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(
          "Failed to fetch user profile:",
          response.status,
          response.statusText
        )
        
      }
      data = await response.json()
    } catch (error) {
      throw new Error("Error fetching user profile:", error)
    }
    
    return data;
    
}

export default getUserProfile;


