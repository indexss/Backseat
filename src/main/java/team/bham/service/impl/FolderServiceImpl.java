package team.bham.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Folder;
import team.bham.repository.FolderRepository;
import team.bham.service.FolderService;
import team.bham.service.dto.FolderDTO;
import team.bham.service.mapper.FolderMapper;

/**
 * Service Implementation for managing {@link Folder}.
 */
@Service
@Transactional
public class FolderServiceImpl implements FolderService {

    private final Logger log = LoggerFactory.getLogger(FolderServiceImpl.class);

    private final FolderRepository folderRepository;

    private final FolderMapper folderMapper;

    public FolderServiceImpl(FolderRepository folderRepository, FolderMapper folderMapper) {
        this.folderRepository = folderRepository;
        this.folderMapper = folderMapper;
    }

    @Override
    public FolderDTO save(FolderDTO folderDTO) {
        log.debug("Request to save Folder : {}", folderDTO);
        Folder folder = folderMapper.toEntity(folderDTO);
        folder = folderRepository.save(folder);
        return folderMapper.toDto(folder);
    }

    @Override
    public FolderDTO update(FolderDTO folderDTO) {
        log.debug("Request to update Folder : {}", folderDTO);
        Folder folder = folderMapper.toEntity(folderDTO);
        folder = folderRepository.save(folder);
        return folderMapper.toDto(folder);
    }

    @Override
    public Optional<FolderDTO> partialUpdate(FolderDTO folderDTO) {
        log.debug("Request to partially update Folder : {}", folderDTO);

        return folderRepository
            .findById(folderDTO.getId())
            .map(existingFolder -> {
                folderMapper.partialUpdate(existingFolder, folderDTO);

                return existingFolder;
            })
            .map(folderRepository::save)
            .map(folderMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderDTO> findAll() {
        log.debug("Request to get all Folders");
        return folderRepository.findAll().stream().map(folderMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FolderDTO> findOne(Long id) {
        log.debug("Request to get Folder : {}", id);
        return folderRepository.findById(id).map(folderMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Folder : {}", id);
        folderRepository.deleteById(id);
    }
}
