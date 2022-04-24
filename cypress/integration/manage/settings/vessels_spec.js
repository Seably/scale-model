describe("Manage > Settings > Vessels", () => {
  beforeEach(() => {
    cy.seed(["base"]);
    cy.login("admin@example.com", "password");
    cy.visit("/manage/organizations/1/settings/meta_data/edit");
  });

  it("show the list of vessels", () => {
    cy.get("[data-cy=vessel-1]");
  });

  it("add a new vessel", () => {
    cy.get("[data-cy=vessel-3]").should("not.exist");
    cy.get("[data-cy=add-vessel]").click();
    cy.get("[data-cy=name]").type("{selectall}A new vessel");
    cy.get("[data-cy=vessel-submit]").click();
    cy.get("[data-cy=vessel-3]");
  });

  it("edit an existing vessel", () => {
    cy.get("[data-cy=vessel-1-edit]").click();
    cy.get("[data-cy=name]").type("{selectall}An updated vessel");
    cy.get("[data-cy=vessel-submit]").click();
    cy.get(".modal").should("not.be.visible", { log: false });
    cy.get("[data-cy=vessel-1]").contains("An updated vessel");
  });

  it("remove an existing vessel and do not move users other to vessel", () => {
    cy.get("[data-cy=vessel-1] .u-text-blue").contains("View (1)");
    cy.get("[data-cy=vessel-1-remove]").click();
    cy.get(".modal").should("be.visible", { log: false });
    cy.get("[data-cy=vessel-remove-submit]").click();
    cy.get(".modal").should("not.be.visible", { log: false });
    cy.get("[data-cy=vessel-1]").should("not.exist");
  });

  it("remove an existing vessel and move users other to vessel", () => {
    cy.get("[data-cy=vessel-1] .u-text-blue").contains("View (1)");
    cy.get("[data-cy=vessel-2] .u-text-blue").contains("View (0)");
    cy.get("[data-cy=vessel-1-remove]").click();
    cy.get(".modal").should("be.visible", { log: false });
    cy.get("[data-cy=select-vessel]").select("M/S Remmer Line");
    cy.get("[data-cy=vessel-remove-submit]").click();
    cy.get(".modal").should("not.be.visible", { log: false });
    cy.get("[data-cy=vessel-1]").should("not.exist");
    cy.get("[data-cy=vessel-2] .u-text-blue").contains("View (1)");
  });
});
