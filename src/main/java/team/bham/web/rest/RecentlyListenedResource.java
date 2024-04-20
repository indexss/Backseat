package team.bham.web.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.config.GroovyMarkupConfigurerBeanDefinitionParser;
import team.bham.config.ApplicationProperties;
import team.bham.domain.Profile;
import team.bham.repository.ProfileRepository;
import team.bham.service.GetRatingService;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.dto.GetRatingDTO;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.responses.RecentListenedTrackResponse;

@RestController
@RequestMapping("/api/discover")
public class RecentlyListenedResource {

    private final Logger log = LoggerFactory.getLogger(RecentlyListenedResource.class);
    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;

    public RecentlyListenedResource(ApplicationProperties appProps, SpotifyConnectionService spotifyConnectionService)
        throws java.io.IOException {
        this.spotifyConnectionService = spotifyConnectionService;
        this.appProps = appProps;
    }

    @Resource
    private ProfileRepository profileRepository;

    @Resource
    private GetRatingService getRatingService;

    @GetMapping("/recent")
    public RecentListenedTrackResponse getTrack() throws IOException, InterruptedException, SpotifyException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername();
        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
            userId = (String) authentication.getPrincipal();
        }
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(userId);
        Profile profile = optionalProfile.get();
        String username = profile.getSpotifyURI();
        log.debug(username);
        SpotifyAPI client = new SpotifyAPI(new SpotifyCredential(appProps, spotifyConnectionService, username));

        RecentListenedTrackResponse resp = client.getRecentTracks();
        return resp;
    }

    @GetMapping("/rating")
    public Double[] getTrackRating() throws IOException, InterruptedException, SpotifyException {
        try {
            //GetRatingDTO recentDTO = getRatingService.GetTrackRating("spotify:track:5wjmqUGN7vrAqFqDWrywlZ");
            //List<GetRatingDTO> listOfRecentDTO = gethelp();
            //return listofRecentDTO.get(1);
            RecentListenedTrackResponse test = getTrack();
            Double ratings[] = new Double[20];
            GetRatingDTO recentDTO = new GetRatingDTO();
            for (int i = 0; i < 20; i++) {
                recentDTO = getRatingService.GetTrackRating(test.items[i].track.uri);
                if (recentDTO.getRating() == null) {
                    ratings[i] = 0.0;
                } else {
                    ratings[i] = recentDTO.getRating();
                }
            }
            //if track has no rating then theres an error

            return ratings;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        //ok so getTrack2() actuallly works and can send a rating of midnight memories to the front
        //now not sure if theres errors because the songs are not reviewed
        //or if there is a type issue
        //could actually be that I've made too much happen in the method again
        //maybe not that but I'm tired so sleepy times
        //think about making different methods and making it simple
        //and don't forget how it all works lmao
    }
}
