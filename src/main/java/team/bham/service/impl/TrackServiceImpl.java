package team.bham.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Track;
import team.bham.repository.TrackRepository;
import team.bham.service.TrackService;
import team.bham.service.dto.TrackDTO;
import team.bham.service.mapper.TrackMapper;

/**
 * Service Implementation for managing {@link Track}.
 */
@Service
@Transactional
public class TrackServiceImpl implements TrackService {

    private final Logger log = LoggerFactory.getLogger(TrackServiceImpl.class);

    private final TrackRepository trackRepository;

    private final TrackMapper trackMapper;

    public TrackServiceImpl(TrackRepository trackRepository, TrackMapper trackMapper) {
        this.trackRepository = trackRepository;
        this.trackMapper = trackMapper;
    }

    @Override
    public TrackDTO save(TrackDTO trackDTO) {
        log.debug("Request to save Track : {}", trackDTO);
        Track track = trackMapper.toEntity(trackDTO);
        track = trackRepository.save(track);
        return trackMapper.toDto(track);
    }

    @Override
    public TrackDTO update(TrackDTO trackDTO) {
        log.debug("Request to update Track : {}", trackDTO);
        Track track = trackMapper.toEntity(trackDTO);
        track.setIsPersisted();
        track = trackRepository.save(track);
        return trackMapper.toDto(track);
    }

    @Override
    public Optional<TrackDTO> partialUpdate(TrackDTO trackDTO) {
        log.debug("Request to partially update Track : {}", trackDTO);

        return trackRepository
            .findById(trackDTO.getSpotifyURI())
            .map(existingTrack -> {
                trackMapper.partialUpdate(existingTrack, trackDTO);

                return existingTrack;
            })
            .map(trackRepository::save)
            .map(trackMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TrackDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tracks");
        return trackRepository.findAll(pageable).map(trackMapper::toDto);
    }

    public Page<TrackDTO> findAllWithEagerRelationships(Pageable pageable) {
        return trackRepository.findAllWithEagerRelationships(pageable).map(trackMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TrackDTO> findOne(String id) {
        log.debug("Request to get Track : {}", id);
        return trackRepository.findOneWithEagerRelationships(id).map(trackMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Track : {}", id);
        trackRepository.deleteById(id);
    }
}
