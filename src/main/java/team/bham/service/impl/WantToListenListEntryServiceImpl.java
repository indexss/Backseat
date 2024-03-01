package team.bham.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.WantToListenListEntry;
import team.bham.repository.WantToListenListEntryRepository;
import team.bham.service.WantToListenListEntryService;
import team.bham.service.dto.WantToListenListEntryDTO;
import team.bham.service.mapper.WantToListenListEntryMapper;

/**
 * Service Implementation for managing {@link WantToListenListEntry}.
 */
@Service
@Transactional
public class WantToListenListEntryServiceImpl implements WantToListenListEntryService {

    private final Logger log = LoggerFactory.getLogger(WantToListenListEntryServiceImpl.class);

    private final WantToListenListEntryRepository wantToListenListEntryRepository;

    private final WantToListenListEntryMapper wantToListenListEntryMapper;

    public WantToListenListEntryServiceImpl(
        WantToListenListEntryRepository wantToListenListEntryRepository,
        WantToListenListEntryMapper wantToListenListEntryMapper
    ) {
        this.wantToListenListEntryRepository = wantToListenListEntryRepository;
        this.wantToListenListEntryMapper = wantToListenListEntryMapper;
    }

    @Override
    public WantToListenListEntryDTO save(WantToListenListEntryDTO wantToListenListEntryDTO) {
        log.debug("Request to save WantToListenListEntry : {}", wantToListenListEntryDTO);
        WantToListenListEntry wantToListenListEntry = wantToListenListEntryMapper.toEntity(wantToListenListEntryDTO);
        wantToListenListEntry = wantToListenListEntryRepository.save(wantToListenListEntry);
        return wantToListenListEntryMapper.toDto(wantToListenListEntry);
    }

    @Override
    public WantToListenListEntryDTO update(WantToListenListEntryDTO wantToListenListEntryDTO) {
        log.debug("Request to update WantToListenListEntry : {}", wantToListenListEntryDTO);
        WantToListenListEntry wantToListenListEntry = wantToListenListEntryMapper.toEntity(wantToListenListEntryDTO);
        wantToListenListEntry = wantToListenListEntryRepository.save(wantToListenListEntry);
        return wantToListenListEntryMapper.toDto(wantToListenListEntry);
    }

    @Override
    public Optional<WantToListenListEntryDTO> partialUpdate(WantToListenListEntryDTO wantToListenListEntryDTO) {
        log.debug("Request to partially update WantToListenListEntry : {}", wantToListenListEntryDTO);

        return wantToListenListEntryRepository
            .findById(wantToListenListEntryDTO.getId())
            .map(existingWantToListenListEntry -> {
                wantToListenListEntryMapper.partialUpdate(existingWantToListenListEntry, wantToListenListEntryDTO);

                return existingWantToListenListEntry;
            })
            .map(wantToListenListEntryRepository::save)
            .map(wantToListenListEntryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WantToListenListEntryDTO> findAll() {
        log.debug("Request to get all WantToListenListEntries");
        return wantToListenListEntryRepository
            .findAll()
            .stream()
            .map(wantToListenListEntryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WantToListenListEntryDTO> findOne(Long id) {
        log.debug("Request to get WantToListenListEntry : {}", id);
        return wantToListenListEntryRepository.findById(id).map(wantToListenListEntryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete WantToListenListEntry : {}", id);
        wantToListenListEntryRepository.deleteById(id);
    }
}
