package team.bham.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Setting;
import team.bham.repository.SettingRepository;
import team.bham.service.SettingService;
import team.bham.service.dto.SettingDTO;
import team.bham.service.mapper.SettingMapper;

/**
 * Service Implementation for managing {@link Setting}.
 */
@Service
@Transactional
public class SettingServiceImpl implements SettingService {

    private final Logger log = LoggerFactory.getLogger(SettingServiceImpl.class);

    private final SettingRepository settingRepository;

    private final SettingMapper settingMapper;

    public SettingServiceImpl(SettingRepository settingRepository, SettingMapper settingMapper) {
        this.settingRepository = settingRepository;
        this.settingMapper = settingMapper;
    }

    @Override
    public SettingDTO save(SettingDTO settingDTO) {
        log.debug("Request to save Setting : {}", settingDTO);
        Setting setting = settingMapper.toEntity(settingDTO);
        setting = settingRepository.save(setting);
        return settingMapper.toDto(setting);
    }

    @Override
    public SettingDTO update(SettingDTO settingDTO) {
        log.debug("Request to update Setting : {}", settingDTO);
        Setting setting = settingMapper.toEntity(settingDTO);
        setting = settingRepository.save(setting);
        return settingMapper.toDto(setting);
    }

    @Override
    public Optional<SettingDTO> partialUpdate(SettingDTO settingDTO) {
        log.debug("Request to partially update Setting : {}", settingDTO);

        return settingRepository
            .findById(settingDTO.getId())
            .map(existingSetting -> {
                settingMapper.partialUpdate(existingSetting, settingDTO);

                return existingSetting;
            })
            .map(settingRepository::save)
            .map(settingMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SettingDTO> findAll() {
        log.debug("Request to get all Settings");
        return settingRepository.findAll().stream().map(settingMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SettingDTO> findOne(Long id) {
        log.debug("Request to get Setting : {}", id);
        return settingRepository.findById(id).map(settingMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Setting : {}", id);
        settingRepository.deleteById(id);
    }
}
