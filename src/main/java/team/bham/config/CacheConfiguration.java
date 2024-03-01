package team.bham.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, team.bham.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, team.bham.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, team.bham.domain.User.class.getName());
            createCache(cm, team.bham.domain.Authority.class.getName());
            createCache(cm, team.bham.domain.User.class.getName() + ".authorities");
            createCache(cm, team.bham.domain.Track.class.getName());
            createCache(cm, team.bham.domain.Track.class.getName() + ".reviews");
            createCache(cm, team.bham.domain.Track.class.getName() + ".artists");
            createCache(cm, team.bham.domain.Track.class.getName() + ".folderEntries");
            createCache(cm, team.bham.domain.Track.class.getName() + ".wantToListenListEntries");
            createCache(cm, team.bham.domain.Album.class.getName());
            createCache(cm, team.bham.domain.Album.class.getName() + ".tracks");
            createCache(cm, team.bham.domain.Album.class.getName() + ".reviews");
            createCache(cm, team.bham.domain.Album.class.getName() + ".artists");
            createCache(cm, team.bham.domain.Album.class.getName() + ".folderEntries");
            createCache(cm, team.bham.domain.Album.class.getName() + ".wantToListenListEntries");
            createCache(cm, team.bham.domain.Review.class.getName());
            createCache(cm, team.bham.domain.Artist.class.getName());
            createCache(cm, team.bham.domain.Artist.class.getName() + ".tracks");
            createCache(cm, team.bham.domain.Artist.class.getName() + ".albums");
            createCache(cm, team.bham.domain.WantToListenListEntry.class.getName());
            createCache(cm, team.bham.domain.WantToListenListEntry.class.getName() + ".tracks");
            createCache(cm, team.bham.domain.WantToListenListEntry.class.getName() + ".albums");
            createCache(cm, team.bham.domain.Folder.class.getName());
            createCache(cm, team.bham.domain.Folder.class.getName() + ".folderEntries");
            createCache(cm, team.bham.domain.FolderEntry.class.getName());
            createCache(cm, team.bham.domain.FolderEntry.class.getName() + ".tracks");
            createCache(cm, team.bham.domain.FolderEntry.class.getName() + ".albums");
            createCache(cm, team.bham.domain.Profile.class.getName());
            createCache(cm, team.bham.domain.Profile.class.getName() + ".folders");
            createCache(cm, team.bham.domain.Profile.class.getName() + ".reviews");
            createCache(cm, team.bham.domain.SpotifyConnection.class.getName());
            createCache(cm, team.bham.domain.Follow.class.getName());
            createCache(cm, team.bham.domain.Setting.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
