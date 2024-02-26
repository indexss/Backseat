package team.bham.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.Folder} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FolderDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @Lob
    private byte[] imagePath;

    private String imagePathContentType;
    private ProfileDTO profile;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImagePath() {
        return imagePath;
    }

    public void setImagePath(byte[] imagePath) {
        this.imagePath = imagePath;
    }

    public String getImagePathContentType() {
        return imagePathContentType;
    }

    public void setImagePathContentType(String imagePathContentType) {
        this.imagePathContentType = imagePathContentType;
    }

    public ProfileDTO getProfile() {
        return profile;
    }

    public void setProfile(ProfileDTO profile) {
        this.profile = profile;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FolderDTO)) {
            return false;
        }

        FolderDTO folderDTO = (FolderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, folderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FolderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            ", profile=" + getProfile() +
            "}";
    }
}
