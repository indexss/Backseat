package team.bham.web.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.config.GroovyMarkupConfigurerBeanDefinitionParser;
import team.bham.config.ApplicationProperties;
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
    private GetRatingService getRatingService;

    @GetMapping("/recent")
    public RecentListenedTrackResponse getTrack() throws IOException, InterruptedException, SpotifyException {
        SpotifyAPI client = new SpotifyAPI(new SpotifyCredential(appProps, spotifyConnectionService, "spotify:user:josiemp169"));
        //TrackResponse resp[] = { client.getTrack("7FAFkQQZFeNwOFzTrSDFIh"), client.getTrack("1PJu7IPmGJZx5fAQeL4trB") };
        RecentListenedTrackResponse resp = client.getRecentTracks();
        return resp;
    }

    public RecentListenedTrackResponse getTrack2() throws IOException, InterruptedException, SpotifyException {
        SpotifyAPI client = new SpotifyAPI(new SpotifyCredential(appProps, spotifyConnectionService, "spotify:user:josiemp169"));
        //TrackResponse resp[] = { client.getTrack("7FAFkQQZFeNwOFzTrSDFIh"), client.getTrack("1PJu7IPmGJZx5fAQeL4trB") };
        RecentListenedTrackResponse resp = client.getRecentTracks();
        return resp;
    }

    public List<GetRatingDTO> gethelp() throws IOException, InterruptedException, SpotifyException {
        RecentListenedTrackResponse test = getTrack2();
        List<GetRatingDTO> listofRecentDTO = new ArrayList(20);
        for (int i = 0; i < 20; i++) {
            listofRecentDTO.add(getRatingService.GetTrackRating(test.items[i].track.uri));
        }
        //log.debug("################################################", resp.items[0].track.uri);
        return listofRecentDTO;
    }

    @GetMapping("/rating")
    public Double[] getTrackRating() throws IOException, InterruptedException, SpotifyException {
        try {
            //GetRatingDTO recentDTO = getRatingService.GetTrackRating("spotify:track:5wjmqUGN7vrAqFqDWrywlZ");
            //List<GetRatingDTO> listOfRecentDTO = gethelp();
            //return listofRecentDTO.get(1);
            RecentListenedTrackResponse test = getTrack2();
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
