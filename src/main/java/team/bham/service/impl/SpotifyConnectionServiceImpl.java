package team.bham.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.SpotifyConnection;
import team.bham.repository.SpotifyConnectionRepository;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.dto.SpotifyConnectionDTO;
import team.bham.service.mapper.SpotifyConnectionMapper;

/**
 * Service Implementation for managing {@link SpotifyConnection}.
 */
@Service
@Transactional
public class SpotifyConnectionServiceImpl implements SpotifyConnectionService {

    private final Logger log = LoggerFactory.getLogger(SpotifyConnectionServiceImpl.class);

    private final SpotifyConnectionRepository spotifyConnectionRepository;

    private final SpotifyConnectionMapper spotifyConnectionMapper;

    public SpotifyConnectionServiceImpl(
        SpotifyConnectionRepository spotifyConnectionRepository,
        SpotifyConnectionMapper spotifyConnectionMapper
    ) {
        this.spotifyConnectionRepository = spotifyConnectionRepository;
        this.spotifyConnectionMapper = spotifyConnectionMapper;
    }

    @Override
    public SpotifyConnectionDTO save(SpotifyConnectionDTO spotifyConnectionDTO) {
        log.debug("Request to save SpotifyConnection : {}", spotifyConnectionDTO);
        SpotifyConnection spotifyConnection = spotifyConnectionMapper.toEntity(spotifyConnectionDTO);
        spotifyConnection = spotifyConnectionRepository.save(spotifyConnection);
        return spotifyConnectionMapper.toDto(spotifyConnection);
    }

    @Override
    public SpotifyConnectionDTO update(SpotifyConnectionDTO spotifyConnectionDTO) {
        log.debug("Request to update SpotifyConnection : {}", spotifyConnectionDTO);
        SpotifyConnection spotifyConnection = spotifyConnectionMapper.toEntity(spotifyConnectionDTO);
        spotifyConnection = spotifyConnectionRepository.save(spotifyConnection);
        return spotifyConnectionMapper.toDto(spotifyConnection);
    }

    @Override
    public Optional<SpotifyConnectionDTO> partialUpdate(SpotifyConnectionDTO spotifyConnectionDTO) {
        log.debug("Request to partially update SpotifyConnection : {}", spotifyConnectionDTO);

        return spotifyConnectionRepository
            .findById(spotifyConnectionDTO.getId())
            .map(existingSpotifyConnection -> {
                spotifyConnectionMapper.partialUpdate(existingSpotifyConnection, spotifyConnectionDTO);

                return existingSpotifyConnection;
            })
            .map(spotifyConnectionRepository::save)
            .map(spotifyConnectionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SpotifyConnectionDTO> findAll() {
        log.debug("Request to get all SpotifyConnections");
        return spotifyConnectionRepository
            .findAll()
            .stream()
            .map(spotifyConnectionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the spotifyConnections where Profile is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SpotifyConnectionDTO> findAllWhereProfileIsNull() {
        log.debug("Request to get all spotifyConnections where Profile is null");
        return StreamSupport
            .stream(spotifyConnectionRepository.findAll().spliterator(), false)
            .filter(spotifyConnection -> spotifyConnection.getProfile() == null)
            .map(spotifyConnectionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SpotifyConnectionDTO> findOne(Long id) {
        log.debug("Request to get SpotifyConnection : {}", id);
        return spotifyConnectionRepository.findById(id).map(spotifyConnectionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SpotifyConnection : {}", id);
        spotifyConnectionRepository.deleteById(id);
    }
}
