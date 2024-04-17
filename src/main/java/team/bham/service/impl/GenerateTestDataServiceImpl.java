package team.bham.service.impl;

import java.time.Instant;
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

    @Resource
    private WantToListenListEntryRepository listenListEntryRepository;

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
        album2.setArtists(new HashSet<>(List.of(artist2)));
        albumRepository.save(album2);

        album3.setSpotifyURI("spotify:album:7p1fX8aUySrBdx4WSYspOu");
        album3.setName("Midnight Memories (Deluxe)");
        album3.setTotalTracks(18);
        album3.setReleaseDate(LocalDate.of(2013, 11, 25));
        album3.setRating(5d);
        album3.setImageURL("https://i.scdn.co/image/ab67616d00001e022f76b797c382bedcafdf45e1");
        album3.setArtists(new HashSet<>(List.of(artist3)));
        albumRepository.save(album3);

        Track track1 = new Track();
        Track track2 = new Track();
        Track track3 = new Track();
        Track track4 = new Track();
        Track track5 = new Track();
        Track track6 = new Track();
        Track track7 = new Track();
        Track track8 = new Track();
        Track track9 = new Track();
        Track track10 = new Track();
        Track track11 = new Track();
        Track track12 = new Track();
        Track track13 = new Track();
        Track track14 = new Track();
        Track track15 = new Track();

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

        track5.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ5");
        track5.setName("Midnight Memories");
        track5.setReleaseDate(LocalDate.of(2013, 11, 25));
        track5.setRating(5d);
        track5.setAlbum(album3);

        track6.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ6");
        track6.setName("Midnight Memories");
        track6.setReleaseDate(LocalDate.of(2013, 11, 25));
        track6.setRating(5d);
        track6.setAlbum(album3);

        track7.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ7");
        track7.setName("Midnight Memories");
        track7.setReleaseDate(LocalDate.of(2013, 11, 25));
        track7.setRating(5d);
        track7.setAlbum(album3);

        track8.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ8");
        track8.setName("Midnight Memories");
        track8.setReleaseDate(LocalDate.of(2013, 11, 25));
        track8.setRating(5d);
        track8.setAlbum(album3);

        track9.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ9");
        track9.setName("Midnight Memories");
        track9.setReleaseDate(LocalDate.of(2013, 11, 25));
        track9.setRating(5d);
        track9.setAlbum(album3);

        track10.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ10");
        track10.setName("Midnight Memories");
        track10.setReleaseDate(LocalDate.of(2013, 11, 25));
        track10.setRating(5d);
        track10.setAlbum(album3);

        track11.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ11");
        track11.setName("Midnight Memories");
        track11.setReleaseDate(LocalDate.of(2013, 11, 25));
        track11.setRating(5d);
        track11.setAlbum(album3);

        track12.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ12");
        track12.setName("Midnight Memories");
        track12.setReleaseDate(LocalDate.of(2013, 11, 25));
        track12.setRating(5d);
        track12.setAlbum(album3);

        track13.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ13");
        track13.setName("Midnight Memories");
        track13.setReleaseDate(LocalDate.of(2013, 11, 25));
        track13.setRating(5d);
        track13.setAlbum(album3);

        track14.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ14");
        track14.setName("Midnight Memories");
        track14.setReleaseDate(LocalDate.of(2013, 11, 25));
        track14.setRating(5d);
        track14.setAlbum(album3);

        track15.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ15");
        track15.setName("Midnight Memories");
        track15.setReleaseDate(LocalDate.of(2013, 11, 25));
        track15.setRating(5d);
        track15.setAlbum(album3);

        //generate more test track

        trackRepository.save(track1);
        trackRepository.save(track2);
        trackRepository.save(track3);
        trackRepository.save(track4);
        trackRepository.save(track5);
        trackRepository.save(track6);
        trackRepository.save(track7);
        trackRepository.save(track8);
        trackRepository.save(track9);
        trackRepository.save(track10);
        trackRepository.save(track11);
        trackRepository.save(track12);
        trackRepository.save(track13);
        trackRepository.save(track14);
        trackRepository.save(track15);

        for (int i = 20; i < 100; i++) {
            Track track = new Track();
            track.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ" + i);
            track.setName("Midnight Memories" + i);
            track.setReleaseDate(LocalDate.of(2013, 11, 25));
            track.setRating(5d);
            track.setAlbum(album3);
            trackRepository.save(track);
        }

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
        artistRepository.save(artist1);

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

    @Override
    public void generateTestWantToListenEntry() {
        WantToListenListEntry entry1 = new WantToListenListEntry();
        entry1.setSpotifyURI("spotify:track:77jIEebt4z9WzaI6LsntDG");
        entry1.setUserID("hao");
        entry1.setAddTime(Instant.now());

        WantToListenListEntry entry2 = new WantToListenListEntry();
        entry2.setSpotifyURI("spotify:track:11dFghVXANMlKmJXsNCbNl");
        entry2.setUserID("hao");
        entry2.setAddTime(Instant.now());

        WantToListenListEntry entry3 = new WantToListenListEntry();
        entry3.setSpotifyURI("spotify:track:5L9anTQJGLyRObYDYvLWdh");
        entry3.setUserID("hao");
        entry3.setAddTime(Instant.now());

        WantToListenListEntry entry4 = new WantToListenListEntry();
        entry4.setSpotifyURI("spotify:track:5wjmqUGN7vrAqFqDWrywlZ");
        entry4.setUserID("hao");
        entry4.setAddTime(Instant.now());

        listenListEntryRepository.save(entry1);
        listenListEntryRepository.save(entry2);
        listenListEntryRepository.save(entry3);
        listenListEntryRepository.save(entry4);
    }
}
