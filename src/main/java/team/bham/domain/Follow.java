package team.bham.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Follow.
 */
@Entity
@Table(name = "follow")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Follow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "source_user_id", nullable = false)
    private String sourceUserID;

    @NotNull
    @Column(name = "target_user_id", nullable = false)
    private String targetUserID;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Follow id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceUserID() {
        return this.sourceUserID;
    }

    public Follow sourceUserID(String sourceUserID) {
        this.setSourceUserID(sourceUserID);
        return this;
    }

    public void setSourceUserID(String sourceUserID) {
        this.sourceUserID = sourceUserID;
    }

    public String getTargetUserID() {
        return this.targetUserID;
    }

    public Follow targetUserID(String targetUserID) {
        this.setTargetUserID(targetUserID);
        return this;
    }

    public void setTargetUserID(String targetUserID) {
        this.targetUserID = targetUserID;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Follow)) {
            return false;
        }
        return id != null && id.equals(((Follow) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Follow{" +
            "id=" + getId() +
            ", sourceUserID='" + getSourceUserID() + "'" +
            ", targetUserID='" + getTargetUserID() + "'" +
            "}";
    }
}
