package team.bham.service.dto;

/**
 * @project : team31
 * @package: team.bham.service.dto
 * @class: AddReviewDTO
 * @date: (UTC + 0 London) 03/03/2024 22:08
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

public class AddReviewDTO {

    private String content;
    private int rating;

    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AddReviewDTO() {}

    public AddReviewDTO(String content, int rating, String trackId) {
        this.content = content;
        this.rating = rating;
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
