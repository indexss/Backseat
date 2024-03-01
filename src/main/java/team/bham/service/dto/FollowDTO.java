package team.bham.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.Follow} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FollowDTO implements Serializable {

    private Long id;

    @NotNull
    private String sourceUserID;

    @NotNull
    private String targetUserID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceUserID() {
        return sourceUserID;
    }

    public void setSourceUserID(String sourceUserID) {
        this.sourceUserID = sourceUserID;
    }

    public String getTargetUserID() {
        return targetUserID;
    }

    public void setTargetUserID(String targetUserID) {
        this.targetUserID = targetUserID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FollowDTO)) {
            return false;
        }

        FollowDTO followDTO = (FollowDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, followDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FollowDTO{" +
            "id=" + getId() +
            ", sourceUserID='" + getSourceUserID() + "'" +
            ", targetUserID='" + getTargetUserID() + "'" +
            "}";
    }
}
