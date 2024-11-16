const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODBmNjJlYWU2OTY4YzQ4ODU5YWI1NWI1ZmJlZGE2OCIsInN1YiI6IjY0Y2E0YzBjMGI3NGU5MDBhYzY2YmJkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q7JVWxOSgu7a_otvFm0HKA0J1hR9WxVfesVbMgx6HaU";

export const fetchActorsData = async (actorIds, imageProfile = 1) => {
  const actorsData = [];

  for (const actorId of actorIds) {
    let actorData = null;
    let actorImage = null;
    let actorInfo = null;

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const actorInfoResponse = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}`,
        options
      );

      if (!actorInfoResponse.ok) {
        throw new Error("Network response was not ok");
      }

      actorInfo = await actorInfoResponse.json();

      const imageDataResponse = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/images`,
        options
      );

      if (!imageDataResponse.ok) {
        throw new Error("Network response was not ok");
      }

      actorData = await imageDataResponse.json();

      if (actorData.profiles) {
        const imageResponse = await fetch(
          `https://image.tmdb.org/t/p/original/${actorData.profiles[imageProfile].file_path}`
        );

        if (!imageResponse.ok) {
          throw new Error("Network response was not ok");
        }

        actorImage = imageResponse.url;
      }
    } catch (error) {
      console.error(
        `There was a problem with fetching data for actor ID ${actorId}:`,
        error
      );
    }

    actorsData.push({ ...actorInfo, image: actorImage });
  }

  return actorsData;
};
