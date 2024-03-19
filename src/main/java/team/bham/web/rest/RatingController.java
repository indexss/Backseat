//package team.bham.web.rest;
//
//import javax.annotation.Resource;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import team.bham.service.ReviewAlbumService;
//import team.bham.service.ReviewTrackSevice;
//import team.bham.service.dto.ReviewAlbumDTO;
//import team.bham.service.dto.ReviewTrackDTO;
//import team.bham.utils.ResponseUtils;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import team.bham.service.dto.AddReviewDTO;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpStatus;
//
//
//@RestController
//@RequestMapping("/api/rating")
//public class RatingController {
//
//    @Resource
//    private ReviewTrackSevice reviewTrackService;
//
//    @Resource
//    private ReviewAlbumService reviewAlbumService;
//
//    // Fetch reviews for either a track or an album
//    @GetMapping("/{spotifyUri}")
//    public ResponseUtils fetchReviewForSpotifyUri(@PathVariable String spotifyUri) {
//        ResponseUtils resp = new ResponseUtils();
//        try {
//            if (spotifyUri.startsWith("spotify:track:")) {
//                ReviewTrackDTO reviewTrackDTO = reviewTrackService.fetchReviewAndTrackInfo(spotifyUri);
//                resp.put("review", reviewTrackDTO);
//            } else if (spotifyUri.startsWith("spotify:album:")) {
//                ReviewAlbumDTO reviewAlbumDTO = reviewAlbumService.fetchReviewAndAlbumInfo( spotifyUri);
//                resp.put("review", reviewAlbumDTO);
//            } else {
//                resp.setCode("400");
//                resp.setMessage("Invalid Spotify URI");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            resp = new ResponseUtils("500", "Internal Server Error: " + e.getMessage());
//        }
//        return resp;
//    }
////    @GetMapping("/")
////    public ResponseUtils fetchReviews(@RequestParam String spotifyUri) {
////        ResponseUtils resp = null;
////        try {
////            if (spotifyUri.startsWith("spotify:track:")) {
////                ReviewTrackDTO reviewTrackDTO = reviewTrackService.fetchReviewAndTrackInfo(spotifyUri);
////                resp = new ResponseUtils().put("review", reviewTrackDTO);
////            } else if (spotifyUri.startsWith("spotify:album:")) {
////                ReviewAlbumDTO reviewAlbumDTO = reviewAlbumService.fetchReviewAndAlbumInfo(spotifyUri);
////                resp = new ResponseUtils().put("review", reviewAlbumDTO);
////        }}
////        catch(Exception e){
////                e.printStackTrace();
////                resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
////        }
////        return resp;
////    }
//
//    // Add a review for either a track or an album
//    @PostMapping("/addreview")
//    public ResponseUtils addReview(@RequestBody AddReviewDTO addReviewDTO) {
//        ResponseUtils resp = null;
//        System.out.println("Received review: " + addReviewDTO);
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userId = null;
//        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            userId = userDetails.getUsername();
//        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
//            userId = (String) authentication.getPrincipal();
//        }
//        //        System.out.println("7777777777: " + addReviewDTO.getId());
//        //        System.out.println("7777777777: " + addReviewDTO.getContent());
//        //        System.out.println("7777777777: " + addReviewDTO.getRating());
//
//        //        System.out.println("888888888888888888888888: " + userId);
//        try {
//            System.out.println(userId);
//            reviewTrackSevice.addReview(addReviewDTO.getRating(), addReviewDTO.getContent(), addReviewDTO.getId(), userId);
//
//            resp = new ResponseUtils();
//        } catch (Exception e) {
//            e.printStackTrace();
//            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
//        }
//        return resp;
//    }
//
//
//    // Check existence of a track or an album
//    @GetMapping("/check/{spotifyUri}")
//    public ResponseEntity<?> checkExist(@PathVariable String spotifyUri) {
//        try {
//            boolean exists;
//            if (spotifyUri.startsWith("spotify:track:")) {
//                String trackId = spotifyUri.split(":")[2];
//                exists = reviewTrackService.checkExist(trackId);
//            } else if (spotifyUri.startsWith("spotify:album:")) {
//                String albumId = spotifyUri.split(":")[2];
//                exists = reviewAlbumService.checkExist(albumId);
//            } else {
//                return ResponseEntity.badRequest().body("Invalid Spotify URI");
//            }
//            return ResponseEntity.ok().body(exists);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }
//
//    private String getCurrentUsername() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//            return ((UserDetails) authentication.getPrincipal()).getUsername();
//        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
//            return (String) authentication.getPrincipal();
//        }
//        return null;
//    }
//}
