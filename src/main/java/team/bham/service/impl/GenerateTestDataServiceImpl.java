package team.bham.service.impl;

import java.time.LocalDate;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.Track;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ArtistRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.GenerateTestDataService;

/**
 * @project : team31
 * @package: team.bham.service.impl
 * @class: generateTestDataServiceImpl
 * @date: (UTC + 0 London) 04/03/2024 21:33
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

@Service
@Transactional
public class GenerateTestDataServiceImpl implements GenerateTestDataService {

    @Resource
    private ArtistRepository artistRepository;

    @Resource
    private AlbumRepository albumRepository;

    @Resource
    private TrackRepository trackRepository;

    @Override
    public void generateTestDate() {
        Artist artist1 = new Artist();
        Artist artist2 = new Artist();
        Artist artist3 = new Artist();

        artist1.setSpotifyURI("spotify:artist:6sFIWsNpZYqfjUpaCgueju");
        artist1.setName("Cerly Rae Japsen");
        artistRepository.save(artist1);

        artist2.setSpotifyURI("spotify:artist:4AK6F7OLvEQ5QYCBNiQWHq");
        artist2.setName("One Direction");
        artistRepository.save(artist2);

        artist3.setSpotifyURI("spotify:artist:3fMbdgg4jU18AjLCKBhRSm");
        artist3.setName("Michael Jackson");
        artistRepository.save(artist3);

        Album album1 = new Album();
        Album album2 = new Album();

        album1.setSpotifyURI("spotify:album:0tGPJ0bkWOUmH7MEOR77qc");
        album1.setName("Cut To The Feeling");
        album1.setTotalTracks(1);
        album1.setReleaseDate(LocalDate.of(2017, 5, 26));
        album1.setRating(5d);
        albumRepository.save(album1);

        album2.setSpotifyURI("spotify:album:52E4RP7XDzalpIrOgSTgiQ");
        album2.setName("Invincible");
        album2.setTotalTracks(16);
        album2.setReleaseDate(LocalDate.of(2001, 10, 29));
        album2.setRating(5d);
        albumRepository.save(album2);

        Track track1 = new Track();
        Track track2 = new Track();

        track1.setSpotifyURI("spotify:track:11dFghVXANMlKmJXsNCbNl");
        track1.setName("Cut To The Feeling");
        track1.setReleaseDate(LocalDate.of(2017, 5, 29));
        track1.setRating(5d);
        track1.setAlbum(album1);

        track2.setSpotifyURI("spotify:track:5L9anTQJGLyRObYDYvLWdh");
        track2.setName("Unbreadkable");
        track2.setReleaseDate(LocalDate.of(2001, 10, 29));
        track2.setRating(3d);
        track2.setAlbum(album2);

        trackRepository.save(track1);
        trackRepository.save(track2);
    }
}
