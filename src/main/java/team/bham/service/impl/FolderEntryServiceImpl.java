package team.bham.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.FolderEntry;
import team.bham.repository.FolderEntryRepository;
import team.bham.service.FolderEntryService;
import team.bham.service.dto.FolderEntryDTO;
import team.bham.service.mapper.FolderEntryMapper;

/**
 * Service Implementation for managing {@link FolderEntry}.
 */
@Service
@Transactional
public class FolderEntryServiceImpl implements FolderEntryService {

    private final Logger log = LoggerFactory.getLogger(FolderEntryServiceImpl.class);

    private final FolderEntryRepository folderEntryRepository;

    private final FolderEntryMapper folderEntryMapper;

    public FolderEntryServiceImpl(FolderEntryRepository folderEntryRepository, FolderEntryMapper folderEntryMapper) {
        this.folderEntryRepository = folderEntryRepository;
        this.folderEntryMapper = folderEntryMapper;
    }

    @Override
    public FolderEntryDTO save(FolderEntryDTO folderEntryDTO) {
        log.debug("Request to save FolderEntry : {}", folderEntryDTO);
        FolderEntry folderEntry = folderEntryMapper.toEntity(folderEntryDTO);
        folderEntry = folderEntryRepository.save(folderEntry);
        return folderEntryMapper.toDto(folderEntry);
    }

    @Override
    public FolderEntryDTO update(FolderEntryDTO folderEntryDTO) {
        log.debug("Request to update FolderEntry : {}", folderEntryDTO);
        FolderEntry folderEntry = folderEntryMapper.toEntity(folderEntryDTO);
        folderEntry = folderEntryRepository.save(folderEntry);
        return folderEntryMapper.toDto(folderEntry);
    }

    @Override
    public Optional<FolderEntryDTO> partialUpdate(FolderEntryDTO folderEntryDTO) {
        log.debug("Request to partially update FolderEntry : {}", folderEntryDTO);

        return folderEntryRepository
            .findById(folderEntryDTO.getId())
            .map(existingFolderEntry -> {
                folderEntryMapper.partialUpdate(existingFolderEntry, folderEntryDTO);

                return existingFolderEntry;
            })
            .map(folderEntryRepository::save)
            .map(folderEntryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderEntryDTO> findAll() {
        log.debug("Request to get all FolderEntries");
        return folderEntryRepository.findAll().stream().map(folderEntryMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FolderEntryDTO> findOne(Long id) {
        log.debug("Request to get FolderEntry : {}", id);
        return folderEntryRepository.findById(id).map(folderEntryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FolderEntry : {}", id);
        folderEntryRepository.deleteById(id);
    }
}
