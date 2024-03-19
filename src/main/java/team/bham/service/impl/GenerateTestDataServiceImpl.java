package team.bham.service.impl;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
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

    @Resource
    private UserRepository userRepository;

    @Resource
    private ProfileRepository profileRepository;

    @Resource
    private PasswordEncoder passwordEncoder;

    @Override
    public void generateTestDate() {
        Artist artist1 = new Artist();
        Artist artist2 = new Artist();
        Artist artist3 = new Artist();

        artist1.setSpotifyURI("spotify:artist:6sFIWsNpZYqfjUpaCgueju");
        artist1.setName("Cerly Rae Japsen");
        artistRepository.save(artist1);

        artist2.setSpotifyURI("spotify:artist:3fMbdgg4jU18AjLCKBhRSm");
        artist2.setName("Michael Jackson");
        artistRepository.save(artist2);

        artist3.setSpotifyURI("spotify:artist:4AK6F7OLvEQ5QYCBNiQWHq");
        artist3.setName("One Direction");
        artistRepository.save(artist3);

        Album album1 = new Album();
        Album album2 = new Album();
        Album album3 = new Album();

        album1.setSpotifyURI("spotify:album:0tGPJ0bkWOUmH7MEOR77qc");
        album1.setName("Cut To The Feeling");
        album1.setTotalTracks(1);
        album1.setReleaseDate(LocalDate.of(2017, 5, 26));
        album1.setRating(5d);
        album1.setImageURL("https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1");
        album1.setArtists(new HashSet<>(List.of(artist1)));
        albumRepository.save(album1);

        album2.setSpotifyURI("spotify:album:52E4RP7XDzalpIrOgSTgiQ");
        album2.setName("Invincible");
        album2.setTotalTracks(16);
        album2.setReleaseDate(LocalDate.of(2001, 10, 29));
        album2.setRating(5d);
        album2.setImageURL("https://i.scdn.co/image/ab67616d0000b273463de2351439f6532ff0dfbd");
        album1.setArtists(new HashSet<>(List.of(artist2)));
        albumRepository.save(album2);

        album3.setSpotifyURI("spotify:album:7p1fX8aUySrBdx4WSYspOu");
        album3.setName("Midnight Memories (Deluxe)");
        album3.setTotalTracks(18);
        album3.setReleaseDate(LocalDate.of(2013, 11, 25));
        album3.setRating(5d);
        album3.setImageURL("https://i.scdn.co/image/ab67616d00001e022f76b797c382bedcafdf45e1");
        album1.setArtists(new HashSet<>(List.of(artist3)));
        albumRepository.save(album3);

        Track track1 = new Track();
        Track track2 = new Track();
        Track track3 = new Track();
        Track track4 = new Track();

        track1.setSpotifyURI("spotify:track:11dFghVXANMlKmJXsNCbNl");
        track1.setName("Cut To The Feeling");
        track1.setReleaseDate(LocalDate.of(2017, 5, 29));
        track1.setRating(5d);
        track1.setAlbum(album1);

        track2.setSpotifyURI("spotify:track:5L9anTQJGLyRObYDYvLWdh");
        track2.setName("Unbreakable");
        track2.setReleaseDate(LocalDate.of(2001, 10, 29));
        track2.setRating(5d);
        track2.setAlbum(album2);

        track3.setSpotifyURI("spotify:track:53NdDxLiNn7VSgDVi9KsYl");
        track3.setName("Privacy");
        track3.setReleaseDate(LocalDate.of(2001, 10, 29));
        track3.setRating(5d);
        track3.setAlbum(album2);

        track4.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ");
        track4.setName("Midnight Memories");
        track4.setReleaseDate(LocalDate.of(2013, 11, 25));
        track4.setRating(5d);
        track4.setAlbum(album3);

        trackRepository.save(track1);
        trackRepository.save(track2);
        trackRepository.save(track3);
        trackRepository.save(track4);

        User demoUser = new User();
        demoUser.setLogin("demo");
        demoUser.setEmail("demo@localhost");
        demoUser.setActivated(true);
        demoUser.setPassword(passwordEncoder.encode("bananaSplit!"));
        Authority userAuth = new Authority();
        userAuth.setName("ROLE_USER");
        demoUser.setAuthorities(new HashSet<>(List.of(userAuth)));
        userRepository.save(demoUser);

        Profile demoUserProfile = new Profile();
        demoUserProfile.setUsername("demouser1983");
        demoUserProfile.setUser(demoUser);
        demoUserProfile.setSpotifyURI("spotify:user:narotuwi");
        profileRepository.save(demoUserProfile);
    }

    @Override
    public void generateMusic() {
        Artist artist1 = new Artist();
        artist1.setSpotifyURI("spotify:artist:2elBjNSdBE2Y3f0j1mjrql");
        artist1.setName("周杰伦");

        Album album1 = new Album();
        album1.setSpotifyURI("spotify:album:7eoWv4CgghZ0gvWjjdye98");
        album1.setName("不能说的秘密电影原声带");
        album1.setTotalTracks(25);
        album1.setReleaseDate(LocalDate.of(2017, 5, 26));
        album1.setRating(5d);
        album1.setImageURL("https://i.scdn.co/image/ab67616d00001e023c4d0dbbc1022845a9a6ecd4");
        album1.setArtists(new HashSet<>(List.of(artist1)));
        albumRepository.save(album1);

        Track track1 = new Track();
        track1.setSpotifyURI("spotify:track:77jIEebt4z9WzaI6LsntDG");
        track1.setName("不能说的秘密");
        track1.setReleaseDate(LocalDate.of(2007, 5, 29));
        track1.setRating(5d);
        track1.setAlbum(album1);
        trackRepository.save(track1);
    }
}
