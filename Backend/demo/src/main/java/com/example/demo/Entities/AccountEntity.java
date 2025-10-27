package com.example.demo.Entities;

import com.example.demo.DTO.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Account")
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(length = 20)
    private String phone;

    @Column(length = 200)
    private String address;

    @Column(name = "date_created", nullable = false, updatable = false)
    private LocalDateTime dateCreated;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "account_roles", joinColumns = @JoinColumn(name = "account_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Set<Role> roles = new HashSet<>();
        public Role getRole() {
            return roles.stream().findFirst().orElse(null);
        }

    @ManyToOne
    @JoinColumn(name = "farm_id")
    @JsonIgnoreProperties({"owner", "fields", "sensor"})
    private FarmEntity farm;

    @ManyToOne
    @JoinColumn(name = "field_id")
    @JsonIgnoreProperties({"farm", "sensors", "cropSeason"})
    private FieldEntity field;


    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDateTime.now();
    }
}
