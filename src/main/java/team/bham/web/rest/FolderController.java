package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import team.bham.service.FolderHandlerService;
import team.bham.service.dto.*;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/folder")
public class FolderController {

    @Resource
    private FolderHandlerService folderHandlerService;

    @PostMapping("/addfolder")
    public ResponseUtils generateData(@RequestBody AddFolderDTO addFolderDTO) {
        ResponseUtils resp = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername();
        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
            userId = (String) authentication.getPrincipal();
        }
        try {
            folderHandlerService.generateFolder(addFolderDTO.getFolderName(), userId);
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @PostMapping("/deletefolder")
    public ResponseUtils deleteFolder(@RequestBody DeleteFolderDTO deleteFolderDTO) {
        ResponseUtils resp = null;
        try {
            folderHandlerService.deleteFolder(deleteFolderDTO.getFolderId());
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @PostMapping("/deletefolderentry")
    public ResponseUtils deleteFolderEntry(@RequestBody AddDeleteEntryDTO addDeleteEntryDTO) {
        ResponseUtils resp = null;
        try {
            folderHandlerService.deleteFolderEntry(addDeleteEntryDTO.getSpotifyURI(), addDeleteEntryDTO.getFolderId());
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @PostMapping("/addentrytofolder")
    public ResponseUtils addEntryToFolder(@RequestBody AddDeleteEntryDTO addDeleteEntryDTO) {
        ResponseUtils resp = null;
        try {
            folderHandlerService.addEntryToFolder(addDeleteEntryDTO.getSpotifyURI(), addDeleteEntryDTO.getFolderId());
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/fetchfolders")
    public ResponseUtils fetchFolder() {
        ResponseUtils resp = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername();
        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
            userId = (String) authentication.getPrincipal();
        }
        try {
            List<FetchFolderDTO> fetchFolderDTOS = folderHandlerService.fetchFolder(userId);
            resp = new ResponseUtils().put("folder", fetchFolderDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/fetchfolderentry")
    public ResponseUtils fetchFolderEntry(long id) {
        ResponseUtils resp = null;
        try {
            FetchFolderEntryDTO fetchFolderEntryDTO = folderHandlerService.fetchFolderEntry(id);
            resp = new ResponseUtils().put("folderEntry", fetchFolderEntryDTO);
        } catch (Exception e) {
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
