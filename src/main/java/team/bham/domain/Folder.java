package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Folder.
 */
@Entity
@Table(name = "folder")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Folder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "image_path")
    private byte[] imagePath;

    @Column(name = "image_path_content_type")
    private String imagePathContentType;

    @OneToMany(mappedBy = "folder")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "folder" }, allowSetters = true)
    private Set<FolderEntry> folderEntries = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "spotifyConnection", "folders", "reviews" }, allowSetters = true)
    private Profile profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Folder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Folder name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImagePath() {
        return this.imagePath;
    }

    public Folder imagePath(byte[] imagePath) {
        this.setImagePath(imagePath);
        return this;
    }

    public void setImagePath(byte[] imagePath) {
        this.imagePath = imagePath;
    }

    public String getImagePathContentType() {
        return this.imagePathContentType;
    }

    public Folder imagePathContentType(String imagePathContentType) {
        this.imagePathContentType = imagePathContentType;
        return this;
    }

    public void setImagePathContentType(String imagePathContentType) {
        this.imagePathContentType = imagePathContentType;
    }

    public Set<FolderEntry> getFolderEntries() {
        return this.folderEntries;
    }

    public void setFolderEntries(Set<FolderEntry> folderEntries) {
        if (this.folderEntries != null) {
            this.folderEntries.forEach(i -> i.setFolder(null));
        }
        if (folderEntries != null) {
            folderEntries.forEach(i -> i.setFolder(this));
        }
        this.folderEntries = folderEntries;
    }

    public Folder folderEntries(Set<FolderEntry> folderEntries) {
        this.setFolderEntries(folderEntries);
        return this;
    }

    public Folder addFolderEntry(FolderEntry folderEntry) {
        this.folderEntries.add(folderEntry);
        folderEntry.setFolder(this);
        return this;
    }

    public Folder removeFolderEntry(FolderEntry folderEntry) {
        this.folderEntries.remove(folderEntry);
        folderEntry.setFolder(null);
        return this;
    }

    public Profile getProfile() {
        return this.profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Folder profile(Profile profile) {
        this.setProfile(profile);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Folder)) {
            return false;
        }
        return id != null && id.equals(((Folder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Folder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            ", imagePathContentType='" + getImagePathContentType() + "'" +
            "}";
    }
}
