package team.bham.service.impl;

import java.util.Optional;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Profile;
import team.bham.domain.User;
import team.bham.repository.ProfileRepository;
import team.bham.service.ProfileService;
import team.bham.service.dto.ProfileDTO;
import team.bham.service.mapper.ProfileMapper;
import team.bham.web.rest.vm.ManagedUserVM;

/**
 * Service Implementation for managing {@link Profile}.
 */
@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

    @Resource
    private ProfileRepository profileRepository1;

    private final Logger log = LoggerFactory.getLogger(ProfileServiceImpl.class);

    private final ProfileRepository profileRepository;

    private final ProfileMapper profileMapper;

    public ProfileServiceImpl(ProfileRepository profileRepository, ProfileMapper profileMapper) {
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
    }

    @Override
    public void createWhenRegister(User user) {
        Profile profile = new Profile();
        profile.setUsername(user.getLogin());
        profile.setSpotifyURI("undefined");
        profile.setUser(user);
        profileRepository1.save(profile);
    }

    @Override
    public ProfileDTO save(ProfileDTO profileDTO) {
        log.debug("Request to save Profile : {}", profileDTO);
        Profile profile = profileMapper.toEntity(profileDTO);
        profile = profileRepository.save(profile);
        return profileMapper.toDto(profile);
    }

    @Override
    public ProfileDTO update(ProfileDTO profileDTO) {
        log.debug("Request to update Profile : {}", profileDTO);
        Profile profile = profileMapper.toEntity(profileDTO);
        profile = profileRepository.save(profile);
        return profileMapper.toDto(profile);
    }

    @Override
    public Optional<ProfileDTO> partialUpdate(ProfileDTO profileDTO) {
        log.debug("Request to partially update Profile : {}", profileDTO);

        return profileRepository
            .findById(profileDTO.getId())
            .map(existingProfile -> {
                profileMapper.partialUpdate(existingProfile, profileDTO);

                return existingProfile;
            })
            .map(profileRepository::save)
            .map(profileMapper::toDto);
    }

    private ProfileDTO stripConnectionInfo(ProfileDTO pdto) {
        pdto.setSpotifyConnection(null);
        return pdto;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProfileDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Profiles");
        return profileRepository.findAll(pageable).map(profileMapper::toDto).map(this::stripConnectionInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProfileDTO> findOne(Long id) {
        log.debug("Request to get Profile : {}", id);
        return profileRepository.findById(id).map(profileMapper::toDto).map(this::stripConnectionInfo);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Profile : {}", id);
        profileRepository.deleteById(id);
    }
}
