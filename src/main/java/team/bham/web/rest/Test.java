package team.bham.web.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/discover")
public class Test {

    private String test[] = { "test", "test" };

    @GetMapping("/test")
    public String[] getTrack() {
        return test;
    }
}
