package team.bham.web.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import team.bham.domain.Artist;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.RecentlyReviewedService;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.RecentlyReviewedDTO;
import team.bham.service.dto.TrackDTO;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/discover")
public class RecentlyReviewedController {

    @Resource
    private RecentlyReviewedService recentlyReviewedService;

    @GetMapping("/track")
    public ResponseUtils fetchRecentTrack() {
        ResponseUtils response = null;
        try {
            List<RecentlyReviewedDTO> recentlyReviewedDTOS = recentlyReviewedService.fetchRecentTrack();
            response = new ResponseUtils().put("discover", recentlyReviewedDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            response = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return response;
    }
}
/*
    @GetMapping("/fetchtracks")
    public List<RecentlyReviewedDTO> fetchRecentTrack() {
        try {
            List<RecentlyReviewedDTO> recentDTO = recentlyReviewedService.fetchRecentTrack();
            return recentDTO;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }*/
//need to do explore folders one once recently reviewed is fixed
//WHY WON'T ANY DATA SEND TO THE FRONT. THE FRONT IS WORKING, SO WHAT IS WRONG AT THE BACK?????
