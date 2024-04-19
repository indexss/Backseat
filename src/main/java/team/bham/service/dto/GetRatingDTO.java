package team.bham.service.dto;

public class GetRatingDTO {

    private Double rating;

    public GetRatingDTO() {}

    public GetRatingDTO(Double rating) {
        this.rating = rating;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
